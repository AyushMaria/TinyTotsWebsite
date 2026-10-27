# TinyTots Social — Instagram scheduler (backend)

Page: https://www.tinytotskindergarten.com/social/ (source: `/social/index.html`, served by the website's Vercel project)
Backend: Supabase project `vibe-volley-booking` (`gmxcmztnkbztiznwutkf`), kept separate by naming:

| Piece | What it is |
|---|---|
| `public.social_members` | Who can use the page. `role` = `owner` (approves, settings, team) or `uploader` |
| `public.social_posts` | One row per Instagram post: media paths, note, caption, status, schedule, Instagram result |
| `public.social_settings` | Posting slots (`[{dow:0-6 (Sun=0), time:"HH:MM"}]`, India time), caption style, hashtags, connected account |
| `public.social_secrets` | Server-only: Instagram token, cron secret (RLS on, no policies) |
| `public.social_schedule_post(post, at?)` | Owner-only: puts a post in the next free slot, or at an exact time |
| Storage bucket `social-media` | Private. Uploads under `uploads/YYYY-MM/<post id>/`. 50 MB per file (free plan) |
| Edge function `social-api` | Page actions: caption (Claude), connect Instagram, team management |
| Edge function `social-publish` | Run every 10 min by pg_cron job `social-publish-every-10-min`; publishes due posts |

Post status flow: `captioning → review → scheduled → publishing → published` (or `failed` / `rejected`).

Publishing uses the Instagram API with Instagram Login (`graph.instagram.com/v25.0`):
create container (`/media`) → wait for `status_code = FINISHED` → `/media_publish`.
Media is passed as 6-hour signed URLs, so the bucket never has to be public.
The token is refreshed automatically when it has less than 20 days left.

Captions: `social-api` sends the photos (or 3 frames from a reel) plus the uploader's note to the
Claude API (`claude-haiku-5-5`). Needs the Supabase Edge Function secret `ANTHROPIC_API_KEY`.

All row-level security is enforced by membership in `social_members`; accounts that exist in the
project for the booking app cannot see or change anything here.

To change the functions: edit `functions/` and redeploy with the Supabase CLI
(`supabase functions deploy social-api --no-verify-jwt`, same for `social-publish`).
Both functions authenticate requests themselves, so JWT verification is off.
