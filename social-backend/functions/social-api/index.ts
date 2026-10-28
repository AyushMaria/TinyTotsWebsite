// social-api: actions called by the TinyTots social page (signed-in team members only).
//   caption            { post_id }                       any member (own post) or owner
//   connect_instagram  { token }                         owner
//   disconnect_instagram                                 owner
//   status                                               member: caption key + Instagram connection state
//   create_member      { email, name, role, password }   owner
//   remove_member      { user_id }                       owner
//   reset_password     { user_id, password }             owner
import { encodeBase64 } from "jsr:@std/encoding@1/base64";
import { admin, BUCKET, cors, getSecret, graphGet, json, setSecret } from "../_shared/common.ts";

const MODEL = "claude-haiku-5-5";

const SCHOOL = `TinyTots Kindergarten is a warm, play-based preschool on Adalat Road in Aurangabad
(Chhatrapati Sambhajinagar), Maharashtra, India, with 24+ years of experience. Programs: Playgroup (2-3 yrs),
Nursery (3-4), Jr KG (4-5), Sr KG (5-6). Teaching draws on Glenn Doman, Piaget and Howard Gardner:
hands-on, multisensory, inquiry-based learning, arts, music, movement, storytelling, festivals and celebrations.
Instagram: @tinytotskg. Website: tinytotskindergarten.com. Phone: +91 9225560007.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const db = admin();
    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await db.auth.getUser(token);
    if (!u?.user) return json({ error: "Please sign in again." }, 401);
    const { data: me } = await db.from("social_members").select("*").eq("user_id", u.user.id).maybeSingle();
    if (!me) return json({ error: "Your account is not on the TinyTots social team." }, 403);
    const isOwner = me.role === "owner";
    const body = await req.json().catch(() => ({}));
    const ownerOnly = () => { if (!isOwner) throw new Error("Only the owner can do this."); };

    switch (body.action) {
      case "status": {
        const { data: s } = await db.from("social_settings").select("ig_username,ig_user_id,ig_token_expires_at").eq("id", 1).single();
        return json({
          caption_key: Boolean(Deno.env.get("ANTHROPIC_API_KEY")),
          instagram: s?.ig_user_id ? { username: s.ig_username, expires_at: s.ig_token_expires_at } : null,
        });
      }
      case "caption":
        return json(await caption(db, body.post_id, me, isOwner));
      case "connect_instagram": {
        ownerOnly();
        const t = String(body.token || "").trim();
        if (t.length < 50) throw new Error("That doesn't look like an Instagram access token.");
        const info = await graphGet("/me", { fields: "user_id,username,account_type", access_token: t });
        if (info.account_type && !["BUSINESS", "MEDIA_CREATOR", "CREATOR"].includes(String(info.account_type).toUpperCase())) {
          throw new Error(`@${info.username} is a ${info.account_type} account. Switch it to Business or Creator first.`);
        }
        await setSecret(db, "ig_token", t);
        const expires = new Date(Date.now() + 59 * 24 * 3600 * 1000).toISOString();
        await db.from("social_settings").update({
          ig_user_id: String(info.user_id ?? info.id), ig_username: info.username,
          ig_connected_at: new Date().toISOString(), ig_token_expires_at: expires,
        }).eq("id", 1);
        return json({ ok: true, username: info.username });
      }
      case "disconnect_instagram": {
        ownerOnly();
        await db.from("social_secrets").delete().eq("name", "ig_token");
        await db.from("social_settings").update({ ig_user_id: null, ig_username: null, ig_token_expires_at: null }).eq("id", 1);
        return json({ ok: true });
      }
      case "create_member": {
        ownerOnly();
        const email = String(body.email || "").trim().toLowerCase();
        const name = String(body.name || "").trim();
        const role = body.role === "owner" ? "owner" : "uploader";
        const password = String(body.password || "");
        if (!/^\S+@\S+\.\S+$/.test(email) || !name) throw new Error("Enter a name and a valid email.");
        if (password.length < 10) throw new Error("Temporary password must be at least 10 characters.");
        let userId: string | undefined;
        const created = await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { name } });
        if (created.error) {
          // existing account in this project: add them to the team and reset their password
          const { data: list } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
          const found = list?.users.find((x) => x.email?.toLowerCase() === email);
          if (!found) throw new Error(created.error.message);
          userId = found.id;
          await db.auth.admin.updateUserById(userId, { password });
        } else userId = created.data.user!.id;
        const { error } = await db.from("social_members").upsert({ user_id: userId, email, name, role, must_change_password: true });
        if (error) throw new Error(error.message);
        return json({ ok: true });
      }
      case "remove_member": {
        ownerOnly();
        if (body.user_id === me.user_id) throw new Error("You can't remove yourself.");
        await db.from("social_members").delete().eq("user_id", body.user_id);
        return json({ ok: true });
      }
      case "reset_password": {
        ownerOnly();
        const password = String(body.password || "");
        if (password.length < 10) throw new Error("Temporary password must be at least 10 characters.");
        const { error } = await db.auth.admin.updateUserById(body.user_id, { password });
        if (error) throw new Error(error.message);
        await db.from("social_members").update({ must_change_password: true }).eq("user_id", body.user_id);
        return json({ ok: true });
      }
      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    return json({ error: (e as Error).message }, 400);
  }
});

async function caption(db: ReturnType<typeof admin>, postId: string, me: { user_id: string }, isOwner: boolean) {
  const { data: post } = await db.from("social_posts").select("*").eq("id", postId).maybeSingle();
  if (!post) throw new Error("Post not found.");
  if (!isOwner && post.created_by !== me.user_id) throw new Error("You can only caption your own uploads.");
  if (!["captioning", "review", "failed", "rejected"].includes(post.status)) throw new Error("This post is already scheduled or published.");

  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) {
    await db.from("social_posts").update({ status: "review", caption_error: "Automatic captions are not switched on yet (caption key missing). Write the caption by hand." }).eq("id", postId);
    return { ok: false, error: "Caption key missing" };
  }

  // images to show the model: photos, or frames taken from a reel
  const paths: string[] = [];
  for (const m of post.media as Array<{ path: string; kind: string; frames?: string[] }>) {
    if (m.kind === "image") paths.push(m.path);
    else if (m.frames) paths.push(...m.frames);
  }
  const images = [];
  for (const p of paths.slice(0, 5)) {
    const { data, error } = await db.storage.from(BUCKET).download(p);
    if (error || !data) continue;
    images.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: encodeBase64(new Uint8Array(await data.arrayBuffer())) } });
  }

  const { data: s } = await db.from("social_settings").select("caption_guidelines,hashtags").eq("id", 1).single();
  const { data: recent } = await db.from("social_posts").select("caption").in("status", ["published", "scheduled"])
    .order("updated_at", { ascending: false }).limit(6);
  const month = new Date().toLocaleString("en-IN", { month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const kind = post.kind === "reel" ? "a Reel (these are frames from the video)" : post.kind === "carousel" ? "a carousel post" : "a single photo post";

  const system = `You write Instagram captions for a preschool's official account.\n\n${SCHOOL}\n\nHouse style from the owner:\n${s?.caption_guidelines}\n\nAlways-on rules:\n- Describe only what is actually visible or stated in the staff note. Never invent events, achievements, numbers, quotes or names.\n- Never name, tag or identify any child, and do not describe a child in a way that singles them out.\n- No promises about fees, admissions dates or results.\n- Keep it under 600 characters before the hashtags.\n- End with a blank line and 8-15 relevant hashtags. Always include these when they fit: ${s?.hashtags}\n- Indian English spelling.\nReply with JSON only: {"caption": "...", "alt_text": "..."} where alt_text is a plain one-sentence description of the image(s) for blind users (no hashtags, no names).`;

  const userText = `This is ${kind}. Current month: ${month}.\nStaff note: ${post.note?.trim() || "(none)"}\n\nRecent captions to avoid repeating:\n${(recent || []).map((r) => "- " + (r.caption || "").slice(0, 140).replace(/\n/g, " ")).join("\n") || "(none yet)"}`;

  const headers: Record<string, string> = { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" };
  // Organisation-level keys must name the workspace to use; workspace-scoped keys don't need this.
  const workspace = Deno.env.get("ANTHROPIC_WORKSPACE_ID");
  if (workspace) headers["anthropic-workspace-id"] = workspace.trim();
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 900,
      system,
      messages: [{ role: "user", content: [...images, { type: "text", text: userText }] }],
    }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = out?.error?.message || `Caption service error ${res.status}`;
    await db.from("social_posts").update({ status: "review", caption_error: msg }).eq("id", postId);
    return { ok: false, error: msg };
  }
  const text = (out.content || []).map((c: { text?: string }) => c.text || "").join("");
  let parsed: { caption?: string; alt_text?: string } = {};
  try { parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)); } catch { parsed = { caption: text.trim() }; }
  const cap = (parsed.caption || "").slice(0, 2200);
  await db.from("social_posts").update({ status: "review", caption: cap, alt_text: (parsed.alt_text || "").slice(0, 1000), caption_error: null }).eq("id", postId);
  return { ok: true, caption: cap };
}
