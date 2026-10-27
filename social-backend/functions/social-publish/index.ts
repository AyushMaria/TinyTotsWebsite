// social-publish: run every 10 minutes by pg_cron. Publishes due posts to Instagram.
// Each run moves every post one step forward (create container -> wait for processing -> publish),
// so long video processing never hits the function time limit.
import { admin, cors, getSecret, graphGet, graphPost, json, setSecret, signedUrl } from "../_shared/common.ts";

type Media = { path: string; kind: "image" | "video" };
type State = { children?: string[]; container?: string; started_at?: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const db = admin();
  const secret = await getSecret(db, "cron_secret");
  if (!secret || req.headers.get("x-cron-secret") !== secret) return json({ error: "forbidden" }, 403);

  const { data: s } = await db.from("social_settings").select("*").eq("id", 1).single();
  const token = await getSecret(db, "ig_token");
  if (!token || !s?.ig_user_id) return json({ ok: true, skipped: "Instagram not connected" });

  const log: string[] = [];
  const igToken = await maybeRefresh(db, token, s, log);

  // claim due posts
  const now = new Date().toISOString();
  const { data: due } = await db.from("social_posts").select("id").eq("status", "scheduled").lte("scheduled_at", now).limit(5);
  for (const d of due || []) {
    await db.from("social_posts").update({ status: "publishing", ig_state: { started_at: now } })
      .eq("id", d.id).eq("status", "scheduled");
  }
  const { data: working } = await db.from("social_posts").select("*").eq("status", "publishing").limit(10);
  for (const post of working || []) {
    try {
      const msg = await advance(db, post, s.ig_user_id, igToken);
      log.push(`${post.id}: ${msg}`);
    } catch (e) {
      const err = (e as Error).message;
      await db.from("social_posts").update({ status: "failed", error: err, attempts: (post.attempts || 0) + 1 }).eq("id", post.id);
      log.push(`${post.id}: failed - ${err}`);
    }
  }
  return json({ ok: true, log });
});

async function maybeRefresh(db: ReturnType<typeof admin>, token: string, s: Record<string, string>, log: string[]) {
  const exp = s.ig_token_expires_at ? new Date(s.ig_token_expires_at).getTime() : 0;
  const connected = s.ig_connected_at ? new Date(s.ig_connected_at).getTime() : 0;
  const lastTry = Number((await getSecret(db, "ig_refresh_tried")) || 0);
  if (exp - Date.now() > 20 * 86400e3) return token;                 // plenty of time left
  if (Date.now() - connected < 86400e3) return token;               // Meta only refreshes tokens older than 24h
  if (Date.now() - lastTry < 6 * 3600e3) return token;              // don't hammer
  await setSecret(db, "ig_refresh_tried", String(Date.now()));
  try {
    const r = await graphGet("https://graph.instagram.com/refresh_access_token", { grant_type: "ig_refresh_token", access_token: token });
    if (r.access_token) {
      await setSecret(db, "ig_token", r.access_token);
      await db.from("social_settings").update({
        ig_token_expires_at: new Date(Date.now() + (Number(r.expires_in) || 59 * 86400) * 1000).toISOString(),
      }).eq("id", 1);
      log.push("token refreshed");
      return r.access_token as string;
    }
  } catch (e) {
    log.push("token refresh failed: " + (e as Error).message);
  }
  return token;
}

async function containerStatus(id: string, token: string) {
  const r = await graphGet(`/${id}`, { fields: "status_code,status", access_token: token });
  return { code: String(r.status_code || ""), detail: String(r.status || "") };
}

async function advance(db: ReturnType<typeof admin>, post: Record<string, any>, igId: string, token: string): Promise<string> {
  const media: Media[] = post.media || [];
  const state: State = post.ig_state || {};
  const save = (st: State) => db.from("social_posts").update({ ig_state: st }).eq("id", post.id);
  if (state.started_at && Date.now() - new Date(state.started_at).getTime() > 90 * 60e3) {
    throw new Error("Instagram took more than 90 minutes to process this post. Try again, or use a shorter/smaller video.");
  }

  if (!state.container) {
    if (post.kind === "carousel") {
      if (!state.children) {
        const children: string[] = [];
        for (const m of media.slice(0, 10)) {
          const url = await signedUrl(db, m.path);
          const params: Record<string, string> = m.kind === "video"
            ? { media_type: "VIDEO", video_url: url, is_carousel_item: "true", access_token: token }
            : { image_url: url, is_carousel_item: "true", access_token: token };
          children.push((await graphPost(`/${igId}/media`, params)).id);
        }
        state.children = children;
        await save(state);
      }
      for (const c of state.children) {
        const st = await containerStatus(c, token);
        if (st.code === "ERROR" || st.code === "EXPIRED") throw new Error(`Instagram could not process a carousel item: ${st.detail || st.code}`);
        if (st.code !== "FINISHED") return "waiting for carousel items";
      }
      const parent = await graphPost(`/${igId}/media`, {
        media_type: "CAROUSEL", children: state.children.join(","), caption: post.caption || "", access_token: token,
      });
      state.container = parent.id;
    } else if (post.kind === "reel") {
      const url = await signedUrl(db, media[0].path);
      const r = await graphPost(`/${igId}/media`, {
        media_type: "REELS", video_url: url, caption: post.caption || "", share_to_feed: "true", access_token: token,
      });
      state.container = r.id;
    } else {
      const url = await signedUrl(db, media[0].path);
      const params: Record<string, string> = { image_url: url, caption: post.caption || "", access_token: token };
      if (post.alt_text) params.alt_text = post.alt_text;
      state.container = (await graphPost(`/${igId}/media`, params)).id;
    }
    await save(state);
  }

  const st = await containerStatus(state.container!, token);
  if (st.code === "ERROR" || st.code === "EXPIRED") throw new Error(`Instagram could not process this post: ${st.detail || st.code}`);
  if (st.code !== "FINISHED") return `processing (${st.code || "pending"})`;

  const pub = await graphPost(`/${igId}/media_publish`, { creation_id: state.container!, access_token: token });
  let permalink: string | null = null;
  try { permalink = (await graphGet(`/${pub.id}`, { fields: "permalink", access_token: token })).permalink || null; } catch { /* optional */ }
  await db.from("social_posts").update({
    status: "published", published_at: new Date().toISOString(), ig_media_id: pub.id, ig_permalink: permalink, error: null,
  }).eq("id", post.id);
  return "published";
}
