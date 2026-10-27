# TinyTots Blog Agent — Playbook

This folder lets an automated agent publish one new parenting post to
www.tinytotskindergarten.com every two weeks, in the same look and voice as the
existing posts. Pushing to `master` deploys the site on Vercel automatically.

Files:
- `PLAYBOOK.md` — this guide (rules for every run)
- `topics.md` — the topic backlog; the run takes the next suitable topic and ticks it off
- `posts.json` — the list of all posts; the blog page, homepage cards and sitemap are built from it
- `post-template.html` — the page layout every post uses (do not edit per post)
- `publish_post.py` — validates a draft and updates every file that lists posts
- `drafts/` — one JSON file per post as it was published

## Steps for one run

1. `git pull` on `master`. Run `python3 blog-agent/publish_post.py --check`. If it fails, stop and report.
2. **Pick the topic.** Open `topics.md` and take the first unticked topic whose season
   is "any" or includes the current month (India time). Skip anything already covered in `posts.json`.
3. **Research facts.** If the post states any fact that could be wrong or out of date
   (age rules, health or nutrition guidance, screen-time limits, festival dates, government rules),
   check it with a web search against an official or expert source (WHO, IAP, Maharashtra
   education department, NCERT, UNICEF). If it cannot be confirmed, leave it out.
   Never invent statistics, studies, quotes, testimonials, parent names or school events.
4. **Choose the photo** (see "Photos").
5. **Write the draft** as `blog-agent/drafts/<slug>.json` (see "Draft format").
6. **Publish:** `python3 blog-agent/publish_post.py --new blog-agent/drafts/<slug>.json`.
   Fix any error it prints and run it again. Never edit `blog.html`, the homepage blog cards
   or the sitemap by hand — the script regenerates them.
7. **Check:** run `--check`; open the new page and read it once as a parent would.
8. **Tick the topic** in `topics.md` (`- [x]` plus the slug and date).
9. **Commit and push to `master`** with the message `Blog: <title>`. Wait for the Vercel
   production deployment to be READY, then confirm the new URL returns 200.
10. **Report** the title, live URL and one-line summary to the owner.

If anything fails and cannot be fixed, do not push. Report what went wrong instead.

## Voice and content

Match the existing posts (read one in `blog/` before writing):
- Warm, practical and encouraging; written as the TinyTots teachers ("our teachers", "at TinyTots").
- Indian English spelling (colour, favourite, centre) and Indian everyday context:
  roti, idli, poha, chutney, tiffin, festivals like Diwali, Sankranti, Ganesh Chaturthi.
  Families may speak Marathi, Hindi and English at home.
- Audience: parents of 2–6 year olds in Aurangabad (Chhatrapati Sambhajinagar).
- 700–1,000 words. A short opening paragraph, then 4–7 sections, each with an `<h3>` heading
  and 1–3 short paragraphs or a short list. End with a closing paragraph that links to
  `/#programs` (or `/#contact` for admission topics) with descriptive link text,
  e.g. "our Playgroup and Nursery programs in Aurangabad".
- Mention Aurangabad / Chh Sambhajinagar naturally 2–4 times. No keyword stuffing.
- Concrete, doable tips with Indian household materials. No product or brand endorsements.
- Health topics: general, gentle guidance only, and suggest consulting a paediatrician
  for anything medical. Never give medicine doses.
- Never state TinyTots fees, discounts, admission dates or new programs unless they are
  already on the homepage. Never make claims about being "No. 1" or rankings.
- Never use real children's names. No content that is unsuitable for a school website.
- Do not repeat an earlier post's angle; link to 1–2 related earlier posts via `related`.

Allowed body tags: `<p> <h3> <ul> <ol> <li> <strong> <em> <a> <br>`.
Links: site links start with `/` (e.g. `/#programs`), other posts are `slug.html`,
external links only to authoritative `https://` sources and only when citing a fact.

## SEO fields

- `seo_title`: 30–70 characters, main phrase first, end with `| TinyTots Aurangabad`.
  Example: `Toilet Training Before Preschool: A Parent's Guide | TinyTots Aurangabad`
- `description`: 110–165 characters, plain sentence, includes the main phrase and Aurangabad.
- `keywords`: 3–7 long-tail phrases a local parent would type.
- `slug`: 3–6 lowercase words with hyphens, no dates (e.g. `toilet-training-before-preschool`).
- `title`: the on-page H1, natural and friendly (can be the same as the topic).

## Photos

Use the Unsplash connector (`search_photos`, `content_filter: "high"`, `orientation: "landscape"`, `per_page: 5`).
Use short, simple queries ("child colouring", "mother reading to toddler", "kids lunch box"); very specific
queries such as "indian preschool classroom" often return nothing.
- Prefer warm, natural photos of Indian / South Asian children or families, classrooms,
  food, art materials or play. Avoid dark, sad, unsafe or staged-looking images, visible
  brand logos, and anything that could be mistaken for a TinyTots student.
- Pick a photo at least 2000 px wide. Call `download_asset` with its `id` (Unsplash requires
  this to record use). Do **not** copy the file into the repo — Unsplash requires
  linking to its own servers, which the script does.
- In the draft set `image.src` to the photo's `urls.raw`, `width`/`height` to the photo's
  size, `credit_name` to the photographer's name, `credit_username` to their username,
  and `unsplash_id` to the photo id. The script adds the required "Photo by … on Unsplash" credit.
- `alt`: describe what is in the photo and tie it to the topic, e.g.
  "Mother reading a picture book with her toddler at home".
- If the Unsplash connector is unavailable, use an unused school photo from `images/`
  (`gallery1.jpg`, `gallery4.jpg`–`gallery7.jpg`) with `src`, `width`, `height`, `alt` only.

## Draft format

```json
{
  "slug": "toilet-training-before-preschool",
  "date": "2026-11-01",
  "title": "Toilet Training Before Preschool: A Gentle Guide",
  "seo_title": "Toilet Training Before Preschool: A Gentle Guide | TinyTots Aurangabad",
  "description": "Signs your toddler is ready, a simple routine and how to handle accidents — toilet training tips from TinyTots preschool in Aurangabad.",
  "keywords": ["toilet training toddler", "potty training before preschool", "playgroup Aurangabad"],
  "hero_subtitle": "One short sentence shown under the title.",
  "listing_text": "Two sentences shown on the blog page.",
  "card_title": "Short title for the homepage card",
  "card_text": "One line for the homepage card (max 110 characters).",
  "read_more": "Read: Toilet training before preschool",
  "image": {
    "src": "https://images.unsplash.com/photo-...?ixid=...&ixlib=rb-4.1.0",
    "width": 4000, "height": 2667,
    "alt": "Toddler washing hands at a small sink",
    "credit_name": "Jane Doe", "credit_username": "janedoe", "unsplash_id": "abc123"
  },
  "related": ["when-should-kids-start-preschool"],
  "body_html": "<p>Opening…</p>\n<h3>Heading</h3>\n<p>…</p>"
}
```
`date` is today's date in India time (YYYY-MM-DD).
