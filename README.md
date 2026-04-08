# 🌱 TinyTots Kindergarten — Official Website

> The official website for **TinyTots Kindergarten**, a nurturing, play-based early education centre in Chh. Sambhajinagar (Aurangabad), Maharashtra, India.

🌐 **Live Site:** [tinytotskindergarten.com](https://tinytotskindergarten.com)

---

## 📋 Overview

This is a fully static, SEO-optimised website built for TinyTots Kindergarten. It is designed to be fast, mobile-friendly, and accessible — helping parents discover the school, learn about the curriculum, and get in touch easily.

---

## ✨ Features

- **Responsive Design** — Mobile-first layout that works beautifully on all screen sizes
- **Play-based Curriculum Showcase** — Highlights the school's unique teaching philosophy and activities
- **Photo Gallery** — A curated grid of classroom and event moments
- **Parent Testimonials** — Social proof from real families
- **Blog Section** — Parenting tips and school news (`blog.html`)
- **Contact Form** — Powered by [FormSubmit](https://formsubmit.co) for zero-backend email delivery
- **Embedded Google Map** — Direct location view for parents
- **Mobile Sticky CTA** — Persistent enroll/call bar on mobile devices
- **Scroll Reveal Animations** — Smooth entrance animations using IntersectionObserver

## 🔍 SEO & Discoverability

- **Schema Markup (JSON-LD)** — `Preschool` structured data for Google Rich Results, including address, phone, opening hours, and geo-coordinates
- **Open Graph & Twitter Cards** — Rich previews when shared on WhatsApp, Facebook, and Twitter
- **`sitemap.xml`** — Submitted to Google Search Console; 2 pages discovered
- **`robots.txt`** — Configured to allow all crawlers and point to the sitemap
- **Canonical URLs, meta description, geo tags** — All set for local SEO in Maharashtra

---

## 🗂️ Project Structure

```
TinyTotsWebsite/
├── index.html          # Main homepage
├── blog.html           # Blog / parenting tips page
├── style.css           # Main stylesheet (homepage)
├── blog.css            # Stylesheet for the blog page
├── server.js           # Minimal Node.js static server (for local dev)
├── sitemap.xml         # XML sitemap for search engines
├── robots.txt          # Crawler directives
├── package.json        # Node dependencies
└── images/             # All site images (gallery, hero, blog, logo)
```

---

## 🚀 Running Locally

No build tools required. You can serve the site in two ways:

### Option 1 — Node.js server

```bash
npm install
node server.js
```

Then open [http://localhost:3000](http://localhost:3000).

### Option 2 — VS Code Live Server

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html`, and select **Open with Live Server**.

---

## 🌍 Deployment

The site is deployed via **[Vercel](https://vercel.com)** with automatic deployments on every push to the `master` branch.

| Branch | Environment | URL |
|---|---|---|
| `master` | Production | [tinytotskindergarten.com](https://tinytotskindergarten.com) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, no framework) |
| Fonts | Google Fonts — Quicksand, Nunito |
| Form handling | [FormSubmit.co](https://formsubmit.co) |
| Maps | Google Maps Embed API |
| Hosting | Vercel |
| Schema | Schema.org JSON-LD (`Preschool`) |

---

## 📞 Contact

**TinyTots Kindergarten**  
Behind Royal Enfield Showroom, Adalat Road  
Chh. Sambhajinagar, Maharashtra — 431005  
📞 [+91 9225560007](tel:+919225560007)  
✉️ [admin@tinytotskindergarten.com](mailto:admin@tinytotskindergarten.com)  
🕐 Mon – Sat: 9:30 AM – 12:00 PM

---

## 🔗 Links

- 🌐 Website: [tinytotskindergarten.com](https://tinytotskindergarten.com)
- 📘 Facebook: [TinyTotsAurangabad](https://www.facebook.com/TinyTotsAurangabad/)
- 📸 Instagram: [@tinytotskg](https://www.instagram.com/tinytotskg/)
- 🎾 Vibe & Volley: [vibevolley.tinytotskindergarten.com](https://vibevolley.tinytotskindergarten.com/)

---

<p align="center">Made with ❤️ for happy children.</p>
