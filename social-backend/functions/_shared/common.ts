// Shared helpers for the TinyTots Instagram scheduler edge functions.
import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

export const GRAPH = "https://graph.instagram.com/v25.0";
export const BUCKET = "social-media";

export const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

export function admin(): SupabaseClient {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getSecret(db: SupabaseClient, name: string): Promise<string | null> {
  const { data } = await db.from("social_secrets").select("value").eq("name", name).maybeSingle();
  return data?.value ?? null;
}

export async function setSecret(db: SupabaseClient, name: string, value: string) {
  const { error } = await db.from("social_secrets").upsert({ name, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function graphGet(path: string, params: Record<string, string>) {
  const url = new URL(path.startsWith("http") ? path : GRAPH + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.error) throw new Error(body?.error?.message || `Instagram error ${res.status}`);
  return body;
}

export async function graphPost(path: string, params: Record<string, string>) {
  const res = await fetch(GRAPH + path, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.error) throw new Error(body?.error?.message || `Instagram error ${res.status}`);
  return body;
}

export async function signedUrl(db: SupabaseClient, path: string, seconds = 6 * 3600) {
  const { data, error } = await db.storage.from(BUCKET).createSignedUrl(path, seconds);
  if (error || !data) throw new Error(`Could not prepare file ${path}: ${error?.message}`);
  return data.signedUrl;
}
