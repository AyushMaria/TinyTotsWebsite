#!/usr/bin/env python3
"""TinyTots blog publisher.

Usage (run from the repository root):
  python3 blog-agent/publish_post.py --new blog-agent/drafts/<slug>.json
      Validate a draft, write blog/<slug>.html, add it to posts.json and
      regenerate the blog list, homepage cards and sitemap.
  python3 blog-agent/publish_post.py --rebuild
      Regenerate the shared sections from posts.json only.
  python3 blog-agent/publish_post.py --check
      Validate everything without writing. Exit code 1 on any problem.

See blog-agent/PLAYBOOK.md for the draft format and writing rules.
"""
import argparse
import datetime as dt
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, parse_qsl, urlencode, urlunsplit

ROOT = Path(__file__).resolve().parent.parent
AGENT = ROOT / "blog-agent"
POSTS_JSON = AGENT / "posts.json"
TEMPLATE = AGENT / "post-template.html"
SITE = "https://www.tinytotskindergarten.com"
IST = dt.timezone(dt.timedelta(hours=5, minutes=30))
UTM = "utm_source=tinytots_kindergarten&utm_medium=referral"

ALLOWED_TAGS = {"p", "h3", "ul", "ol", "li", "strong", "em", "a", "br"}
REQUIRED_FIELDS = ["slug", "date", "title", "seo_title", "description", "keywords",
                   "hero_subtitle", "listing_text", "card_title", "card_text",
                   "read_more", "image", "related", "body_html"]


class Problem(Exception):
    pass


def esc(s):
    # attributes are always double-quoted, so apostrophes can stay readable
    return html.escape(str(s), quote=True).replace("&#x27;", "'")


def fmt_date(iso):
    d = dt.date.fromisoformat(iso)
    return f"{d.strftime('%B')} {d.day}, {d.year}"


def load_posts():
    return json.loads(POSTS_JSON.read_text(encoding="utf-8"))


def is_remote(img):
    return str(img["src"]).startswith("http")


def remote_url(src, **params):
    """Unsplash CDN URL with sizing params replaced."""
    parts = urlsplit(src)
    keep = [(k, v) for k, v in parse_qsl(parts.query) if k in ("ixid", "ixlib")]
    keep += [(k, str(v)) for k, v in params.items()]
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(keep), ""))


def img_src(img, width, prefix):
    if is_remote(img):
        return remote_url(img["src"], w=width, q=80, fm="jpg", fit="max")
    return prefix + img["src"]


def img_dims(img, width):
    if is_remote(img):
        w = min(width, img["width"])
        return w, round(img["height"] * w / img["width"])
    return img["width"], img["height"]


def og_image(img):
    if is_remote(img):
        return remote_url(img["src"], w=1200, h=630, fit="crop", crop="entropy", q=80, fm="jpg")
    return f"{SITE}/{img['src']}"


def post_url(post):
    return f"{SITE}/blog/{post['slug']}.html"


# ───────────────────────────── validation ─────────────────────────────

class BodyChecker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.bad_tags, self.links, self.text, self.stack, self.unbalanced = set(), [], [], [], []

    def handle_starttag(self, tag, attrs):
        if tag not in ALLOWED_TAGS:
            self.bad_tags.add(tag)
        if tag == "a":
            self.links.append(dict(attrs).get("href", ""))
        if tag != "br":
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        else:
            self.unbalanced.append(tag)

    def handle_data(self, data):
        self.text.append(data)


def validate_draft(d, posts, today=None):
    errs = []
    for f in REQUIRED_FIELDS:
        if f not in d or d[f] in ("", None, []):
            errs.append(f"missing field: {f}")
    if errs:
        raise Problem("; ".join(errs))
    slugs = {p["slug"] for p in posts}
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", d["slug"]):
        errs.append("slug must be lowercase words joined by hyphens")
    if d["slug"] in slugs:
        errs.append(f"slug already used: {d['slug']}")
    if (ROOT / "blog" / f"{d['slug']}.html").exists():
        errs.append(f"blog/{d['slug']}.html already exists")
    try:
        day = dt.date.fromisoformat(d["date"])
        today = today or dt.datetime.now(IST).date()
        if day > today + dt.timedelta(days=1):
            errs.append("date is in the future")
    except ValueError:
        errs.append("date must be YYYY-MM-DD")
    if not 30 <= len(d["seo_title"]) <= 70:
        errs.append(f"seo_title must be 30-70 characters (is {len(d['seo_title'])})")
    if not 110 <= len(d["description"]) <= 165:
        errs.append(f"description must be 110-165 characters (is {len(d['description'])})")
    if not isinstance(d["keywords"], list) or not 3 <= len(d["keywords"]) <= 7:
        errs.append("keywords must be a list of 3-7 phrases")
    if len(d["card_text"]) > 110:
        errs.append("card_text must be 110 characters or fewer")
    for r in d["related"]:
        if r not in slugs:
            errs.append(f"related post not found: {r}")
    if not 1 <= len(d["related"]) <= 2:
        errs.append("related must list 1-2 existing post slugs")

    img = d["image"]
    for f in ("src", "width", "height", "alt"):
        if f not in img:
            errs.append(f"image.{f} missing")
    if "src" in img:
        if is_remote(img):
            if urlsplit(img["src"]).netloc != "images.unsplash.com":
                errs.append("remote images must be images.unsplash.com URLs (use the photo's urls.raw)")
            for f in ("credit_name", "credit_username", "unsplash_id"):
                if not img.get(f):
                    errs.append(f"image.{f} required for Unsplash photos")
        elif not (ROOT / img["src"]).exists():
            errs.append(f"image file not found: {img['src']}")
    if len(img.get("alt", "")) < 15:
        errs.append("image.alt must describe the photo (15+ characters)")

    body = d["body_html"]
    chk = BodyChecker()
    chk.feed(body)
    chk.close()
    if chk.bad_tags:
        errs.append(f"body uses tags that are not allowed: {sorted(chk.bad_tags)}")
    if chk.unbalanced or chk.stack:
        errs.append("body HTML has unclosed or mismatched tags")
    text = " ".join(chk.text)
    words = len(re.findall(r"\b\w+\b", text))
    if not 600 <= words <= 1300:
        errs.append(f"body must be 600-1300 words (is {words})")
    local = len(re.findall(r"aurangabad|sambhajinagar", text, re.I))
    if local < 2:
        errs.append("body must mention Aurangabad / Sambhajinagar at least twice")
    if body.count("<h3>") < 3:
        errs.append("body needs at least 3 <h3> subheadings")
    if not any(h in ("/#programs", "/#contact") for h in chk.links):
        errs.append('body must link to "/#programs" or "/#contact"')
    for h in chk.links:
        if not (h.startswith("/") or h.startswith("https://") or re.fullmatch(r"[a-z0-9-]+\.html", h)):
            errs.append(f"link not allowed: {h!r}")
    blob = json.dumps(d, ensure_ascii=False).lower()
    for bad in ("{{", "lorem ipsum", "as an ai", "[insert", "tbd", "todo"):
        if bad in blob:
            errs.append(f"draft contains placeholder text: {bad!r}")
    if errs:
        raise Problem("; ".join(errs))


# ───────────────────────────── rendering ─────────────────────────────

def render_post(d, posts):
    img = d["image"]
    w, h = img_dims(img, 1600)
    remote = is_remote(img)
    credit = ""
    if remote:
        credit = (
            '            <p class="photo-credit">Photo by '
            f'<a href="https://unsplash.com/@{esc(img["credit_username"])}?{UTM}" target="_blank" rel="noopener">{esc(img["credit_name"])}</a>'
            f' on <a href="https://unsplash.com/?{UTM}" target="_blank" rel="noopener">Unsplash</a></p>\n'
        )
    by_slug = {p["slug"]: p for p in posts}
    rel_items = "".join(
        f'                        <li><a href="{r}.html">{esc(by_slug[r]["title"])}</a></li>\n' for r in d["related"])
    related = (
        '                <div class="blog-related">\n'
        '                    <h3>Keep Reading</h3>\n'
        '                    <ul>\n' + rel_items +
        '                    </ul>\n'
        '                </div>\n'
    )
    posting = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": d["title"],
        "datePublished": d["date"],
        "dateModified": d.get("modified", d["date"]),
        "description": d["description"],
        "image": og_image(img),
        "url": post_url(d),
        "inLanguage": "en-IN",
        "keywords": ", ".join(d["keywords"]),
        "author": {"@type": "Organization", "name": "TinyTots Kindergarten", "url": SITE + "/"},
        "publisher": {
            "@type": "Preschool",
            "@id": SITE + "/#school",
            "name": "TinyTots Kindergarten",
            "url": SITE + "/",
            "logo": {"@type": "ImageObject", "url": SITE + "/images/logo.jpg"},
        },
        "mainEntityOfPage": {"@type": "WebPage", "@id": post_url(d)},
    }
    crumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": SITE + "/blog.html"},
            {"@type": "ListItem", "position": 3, "name": d["title"], "item": post_url(d)},
        ],
    }

    def ind(obj):
        return "\n".join("    " + line for line in json.dumps(obj, indent=2, ensure_ascii=False).splitlines())

    body = "\n".join("                " + line.strip() for line in d["body_html"].strip().splitlines() if line.strip())
    short = d["seo_title"].split("|")[0].strip()
    values = {
        "SEO_TITLE": esc(d["seo_title"]),
        "DESCRIPTION": esc(d["description"]),
        "KEYWORDS": esc(", ".join(d["keywords"])),
        "URL": post_url(d),
        "OG_IMAGE": esc(og_image(img)),
        "DATE_ISO": d["date"],
        "TWITTER_TITLE": esc(f"{short} | TinyTots Aurangabad"),
        "PRECONNECT": '    <link rel="preconnect" href="https://images.unsplash.com">\n' if remote else "",
        "SCHEMA_POSTING": ind(posting),
        "SCHEMA_BREADCRUMB": ind(crumbs),
        "H1": esc(d["title"]),
        "HERO_SUBTITLE": esc(d["hero_subtitle"]),
        "IMG_SRC": esc(img_src(img, 1600, "../")),
        "IMG_ALT": esc(img["alt"]),
        "IMG_W": str(w),
        "IMG_H": str(h),
        "PHOTO_CREDIT": credit,
        "DATE_DISPLAY": fmt_date(d["date"]),
        "BODY": body,
        "RELATED": related,
    }
    out = TEMPLATE.read_text(encoding="utf-8")
    for k, v in values.items():
        out = out.replace("{{" + k + "}}", v)
    if "{{" in out:
        raise Problem("template placeholder left unfilled: " + re.search(r"\{\{\w+\}\}", out).group(0))
    return out


def blog_list_html(posts):
    out = []
    for p in posts:
        img = p["image"]
        w, h = img_dims(img, 1200)
        out.append(f'''        <article class="blog-post-full reveal">
            <a href="blog/{p['slug']}.html" class="blog-post-link">
                <div class="blog-post-image">
                    <img src="{esc(img_src(img, 1200, './'))}"
                         alt="{esc(img['alt'])}" width="{w}" height="{h}" loading="lazy">
                </div>
                <div class="blog-post-content">
                    <span class="blog-post-date">{fmt_date(p['date'])}</span>
                    <h2>{esc(p['title'])}</h2>
                    <p>{esc(p['listing_text'])}</p>
                    <span class="blog-read-more">{esc(p['read_more'])} →</span>
                </div>
            </a>
        </article>
''')
    return "".join(out)


def blog_schema_html(posts):
    data = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "TinyTots Kindergarten Blog",
        "description": "Expert parenting tips, early education insights, and activity ideas from TinyTots preschool in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra.",
        "url": SITE + "/blog.html",
        "publisher": {"@type": "Preschool", "@id": SITE + "/#school", "name": "TinyTots Kindergarten", "url": SITE + "/"},
        "blogPost": [{
            "@type": "BlogPosting",
            "headline": p["title"],
            "datePublished": p["date"],
            "description": p["description"],
            "image": og_image(p["image"]),
            "url": post_url(p),
        } for p in posts],
    }
    body = "\n".join("    " + l for l in json.dumps(data, indent=2, ensure_ascii=False).splitlines())
    return f'    <script type="application/ld+json">\n{body}\n    </script>\n'


def home_cards_html(posts):
    cards = []
    for p in posts[:4]:
        img = p["image"]
        cards.append(f'''            <div class="blog-card reveal-child">
                <img src="{esc(img_src(img, 800, './'))}"
                     alt="{esc(img['alt'])}" width="400" height="200" loading="lazy">
                <div class="blog-card-body">
                    <h3>{esc(p['card_title'])}</h3>
                    <p>{esc(p['card_text'])}</p>
                    <a href="blog/{p['slug']}.html">{esc(p['read_more'])} →</a>
                </div>
            </div>
''')
    return '        <div class="blog-grid">\n' + "".join(cards) + "        </div>\n"


def sitemap_html(posts):
    out = []
    for p in posts:
        img = p["image"]
        image_xml = ""
        if not is_remote(img):
            image_xml = (f"    <image:image>\n      <image:loc>{SITE}/{img['src']}</image:loc>\n"
                         f"      <image:title>{esc(p['title'])}</image:title>\n    </image:image>\n")
        out.append(f"  <url>\n    <loc>{post_url(p)}</loc>\n    <lastmod>{p.get('modified', p['date'])}</lastmod>\n"
                   f"    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n{image_xml}  </url>\n")
    return "".join(out)


def replace_between(text, name, new, path):
    pat = re.compile(r"(<!-- " + name + r":START[^>]*-->\n)(.*?)([ \t]*<!-- " + name + r":END -->)", re.S)
    if not pat.search(text):
        raise Problem(f"marker {name} not found in {path}")
    return pat.sub(lambda m: m.group(1) + new + m.group(3), text, count=1)


def bump_lastmod(text, loc, date):
    pat = re.compile(r"(<loc>" + re.escape(loc) + r"</loc>\s*<lastmod>)(\d{4}-\d{2}-\d{2})(</lastmod>)")
    return pat.sub(lambda m: m.group(1) + max(m.group(2), date) + m.group(3), text)


def build_shared(posts):
    """Return {path: new_text} for every generated file."""
    posts = sorted(posts, key=lambda p: p["date"], reverse=True)
    newest = posts[0]["date"]
    out = {}
    p = ROOT / "blog.html"
    t = p.read_text(encoding="utf-8")
    t = replace_between(t, "BLOG-LIST", blog_list_html(posts), p)
    t = replace_between(t, "BLOG-SCHEMA", blog_schema_html(posts), p)
    out[p] = t
    p = ROOT / "index.html"
    out[p] = replace_between(p.read_text(encoding="utf-8"), "HOME-BLOG-CARDS", home_cards_html(posts), p)
    p = ROOT / "sitemap.xml"
    t = replace_between(p.read_text(encoding="utf-8"), "BLOG-POSTS", sitemap_html(posts), p)
    t = bump_lastmod(t, SITE + "/", newest)
    t = bump_lastmod(t, SITE + "/blog.html", newest)
    out[p] = t
    return out


def check_jsonld(path, text):
    for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S):
        try:
            json.loads(m)
        except json.JSONDecodeError as e:
            raise Problem(f"invalid JSON-LD in {path}: {e}")


def check_all(posts):
    errs = []
    for p in posts:
        if not (ROOT / "blog" / f"{p['slug']}.html").exists():
            errs.append(f"page missing for {p['slug']}")
    try:
        built = build_shared(posts)
        for path, text in built.items():
            if path.read_text(encoding="utf-8") != text:
                errs.append(f"{path.name} is out of date (run --rebuild)")
    except Problem as e:
        errs.append(str(e))
    for path in [ROOT / "index.html", ROOT / "blog.html", *sorted((ROOT / "blog").glob("*.html"))]:
        try:
            check_jsonld(path.name, path.read_text(encoding="utf-8"))
        except Problem as e:
            errs.append(str(e))
    if errs:
        raise Problem("; ".join(errs))


def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--new", metavar="DRAFT_JSON")
    g.add_argument("--rebuild", action="store_true")
    g.add_argument("--check", action="store_true")
    a = ap.parse_args()
    posts = load_posts()
    try:
        if a.check:
            check_all(posts)
            print(f"OK: {len(posts)} posts, all generated sections up to date")
            return
        if a.new:
            draft = json.loads(Path(a.new).read_text(encoding="utf-8"))
            validate_draft(draft, posts)
            page = render_post(draft, posts)
            check_jsonld("new post", page)
            entry = {k: draft[k] for k in ("slug", "date", "title", "description", "listing_text",
                                           "card_title", "card_text", "read_more", "image")}
            entry["modified"] = draft["date"]
            entry["keywords"] = draft["keywords"]
            entry["related"] = draft["related"]
            posts.append(entry)
            built = build_shared(posts)
            (ROOT / "blog" / f"{draft['slug']}.html").write_text(page, encoding="utf-8")
            for path, text in built.items():
                path.write_text(text, encoding="utf-8")
            POSTS_JSON.write_text(json.dumps(posts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            print(f"Published blog/{draft['slug']}.html ({len(posts)} posts)")
        else:
            for path, text in build_shared(posts).items():
                path.write_text(text, encoding="utf-8")
            print("Rebuilt blog list, homepage cards and sitemap")
        check_all(load_posts())
    except Problem as e:
        print("ERROR:", e, file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
