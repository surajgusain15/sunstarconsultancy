# PRD: SUNSTAR CONSULTANCY — Next.js to Astro Migration

**Date:** 2026-05-24
**Project:** SUNSTAR CONSULTANCY corporate website
**Source:** `/go/src/sunstarconsultancy` (Next.js 16 + React 18)
**Target:** Astro (with React Islands + Astro Content Collections + Astro Server Endpoints)

---

## 1. Goals

- Migrate from Next.js (App Router) to Astro with zero regression in functionality, styling, SEO, and performance.
- Keep existing React components as Astro client islands for interactive sections (Hero animations, Contact form, Theme toggle, Particle canvas).
- Restructure blog content into Astro Content Collections for type safety and easier maintainability.
- Port contact form backend to Astro server endpoints.
- Self-hosted deployment (static pages + serverless API).
- Eliminate Next.js-specific dependencies (`next`, `next-env.d.ts`, `next.config.mjs`).

## 2. Success Criteria

- All sections render identically (Hero, TechStack, Services, WhyChooseUs, Process, Portfolio, Testimonials, Blog, Contact, Footer).
- Dark/light theme toggle works with local-storage persistence (no flash).
- Blog listing page with search and tag filtering works identically.
- All 5 blog post pages render correctly with syntax-highlighted code blocks.
- Contact form validates client-side and submits to `/api/contact` with Turnstile CAPTCHA.
- Security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) applied.
- Sitemap at `/sitemap.xml`.
- JSON-LD structured data present on homepage and blog posts.
- Lighthouse scores preserved or improved.
- Build succeeds with zero TypeScript errors.

## 3. Architecture

### 3.1 Output Mode: `hybrid`

Astro output mode `hybrid` — all pages are statically rendered except the API endpoint.

- Static routes: `/`, `/blog`, `/blog/[slug]`
- Server endpoint: `POST /api/contact`

### 3.2 Directory Structure (Target)

```
src/
  layouts/
    Layout.astro          # Root layout (replaces app/layout.tsx)
  pages/
    index.astro           # Homepage (replaces app/page.tsx)
    blog/
      index.astro         # Blog listing (replaces app/blog/page.tsx)
      [slug].astro        # Blog post (replaces app/blog/[slug]/page.tsx)
    api/
      contact.ts          # Form handler (replaces app/api/contact/route.ts)
  components/
    layout/
      Container.tsx       # Keep — no Next.js deps
      Navbar.tsx          # Keep as React island — replace next/link with <a>
    sections/
      Hero.tsx            # Keep as React island — replace next/link with <a>
      TechStack.tsx       # Keep as React — rendered server-side, no client:* needed
      Services.tsx        # Same as above
      WhyChooseUs.tsx     # Same as above (AnimatedCounter needs client:*)
      Process.tsx         # Same as above
      Portfolio.tsx       # Same as above
      Testimonials.tsx    # Same as above
      BlogSection.tsx     # Same as above
      Contact.tsx         # Keep as React island — replace next/script, next/link
      Footer.tsx          # Keep — replace next/link with <a>
    ui/
      AnimatedDiv.tsx     # Keep — no Next.js deps
      AnimatedCounter.tsx # Keep — no Next.js deps
      Button.tsx          # Keep — replace next/link with <a>
      HashScrollHandler.tsx  # Keep — replace usePathname with window.location.hash
      ParticleBackground.tsx # Keep — no Next.js deps
      ScrollToTop.tsx     # Keep — no Next.js deps
      ThemeToggle.tsx     # Keep — no Next.js deps
  content/
    blog/                 # Astro content collection
      building-scalable-apis-in-go.md
      go-concurrency-patterns.md
      php-modernization-strategies.md
      kubernetes-best-practices-for-startups.md
      microservices-architecture-patterns.md
    config.ts             # Content collection schema definition
  lib/
    schema.ts             # Keep as-is (JSON-LD data)
    metadata.ts           # Delete — replaced by Astro frontmatter + <Head>
    blog.ts               # Delete — replaced by content collections
public/
  favicon.svg             # Keep
  robots.txt              # Keep
```

### 3.3 Component Classification

| Category | Components | Astro treatment |
|---|---|---|
| **Static** (no JS needed) | TechStack, Services, Process, Portfolio, Testimonials, BlogSection, Footer, Container | Rendered as React components server-side by Astro. No `client:*` directive. |
| **Interactive islands** | Hero, Contact, BlogContent, ThemeToggle, ParticleBackground, HashScrollHandler, ScrollToTop, Navbar, Button | `client:visible` or `client:load`. Same React components but remove Next.js hooks. |
| **Animated on scroll** | AnimatedDiv, AnimatedCounter, WhyChooseUs, Section headers | Need `client:visible` for scroll-triggered framer-motion animations. |
| **Deleted** | `blog.ts`, `metadata.ts` | Replaced by Content Collections. |

### 3.4 Component Migration Details

#### Next.js imports to replace across all components:

| Next.js import | Replace with |
|---|---|
| `next/link` | `<a>` |
| `next/navigation` (`usePathname`) | `window.location.hash` |
| `next/navigation` (`useSearchParams`) | `new URLSearchParams(window.location.search)` |
| `next/script` | `<script>` tag injected in `Layout.astro` |
| `next/font/google` | Google Fonts `@import` in global CSS or `<link>` in `<head>` |
| `next/metadata` type + `Metadata` | Astro frontmatter `export const metadata` or `<Head>` |
| `next.config.mjs` headers | Astro `astro.config.mjs` + server reverse proxy headers |

#### Specific component changes:

**Navbar.tsx:**
- `Link from "next/link"` → `<a>` elements
- `import ThemeToggle` — keep
- `import Button` — keep

**Hero.tsx:**
- Remove `import Button from "@/components/ui/Button"` → import remains same (Button itself changes)
- Remove Next.js dependencies — none actually used beyond Link (already removed)

**Contact.tsx:**
- `Script from "next/script"` → inline `<script>` tag or load in layout
- `Link from "next/link"` → `<a>`
- Keep everything else (form logic, Turnstile API, framer-motion)

**BlogContent.tsx:**
- `useSearchParams from "next/navigation"` → `new URLSearchParams(window.location.search)` in a `useEffect`
- `Link from "next/link"` → `<a>`
- Import blog data from content collection via Astro props instead of `@/lib/blog`

**HashScrollHandler.tsx:**
- `usePathname from "next/navigation"` → use `window.location.hash` directly

**Button.tsx:**
- `Link from "next/link"` → `<a>`

**Footer.tsx:**
- `Link from "next/link"` → `<a>`

### 3.5 Blog Content Collections

Each blog post becomes a `.md` file in `src/content/blog/` with frontmatter:

```yaml
---
title: "Building Scalable APIs in Go"
slug: "building-scalable-apis-in-go"
excerpt: "Best practices for designing high-performance APIs..."
category: "Go"
tags: ["Go", "APIs", "Performance", "REST"]
date: "May 15, 2026"
readTime: "8 min read"
author: "SUNSTAR Engineering Team"
---
```

Content collection schema defined in `src/content/config.ts` using Zod for type validation.

The `/blog` listing queries `getCollection('blog')` and passes data to the React `BlogContent` component as props (removing the need for `useSearchParams`-based initial tag filtering — this becomes Astro's responsibility).

The `[slug].astro` page generates static params via `getCollection('blog')` and renders the Markdown body using Astro's built-in content rendering (replacing the manual `renderContent` function in the old Next.js code).

### 3.6 API Endpoint

`src/pages/api/contact.ts` — identical validation logic to current `app/api/contact/route.ts` but as an Astro server endpoint:

```ts
export const prerender = false;
export async function POST({ request }: APIContext) { ... }
```

Same Cloudflare Turnstile token verification. Returns JSON responses.

### 3.7 SEO & Structured Data

- **Title/Meta:** Per-page `<title>` and `<meta>` tags set in Astro frontmatter or layout props.
- **JSON-LD:** `<script type="application/ld+json">` injected in `Layout.astro` (organization) and `index.astro` (service).
- **Sitemap:** `@astrojs/sitemap` integration — auto-generates from `src/pages/`.
- **Canonical URLs:** Set per-page in frontmatter.
- **Open Graph:** Meta tags in layout head.

### 3.8 Styling

- Tailwind CSS via `@astrojs/tailwind`.
- Custom CSS variables (`--bg-primary`, `--text-primary`, etc.) from `globals.css` migrated into `src/styles/global.css`.
- Same Tailwind config (`tailwind.config.ts`) kept as-is.
- Dark mode class strategy unchanged (`dark` class on `<html>`).

### 3.9 Animations

- Framer Motion kept as-is for scroll-reveal animations (`AnimatedDiv`, `AnimatedCounter`).
- React islands with `client:visible` for section animations.
- Particle canvas background kept as React island with `client:load` (needs immediate render on Hero section).
- Theme toggle and Navbar glass effect handled via React state.

### 3.10 Security Headers

Configured in `astro.config.mjs` using Vercel-like approach (or handled at reverse-proxy level for self-hosted):

```ts
export default defineConfig({
  // ...
  vite: {
    plugins: [{
      name: 'security-headers',
      enforce: 'post',
      transformIndexHtml() {
        return [
          { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP_STRING } },
          // or set headers at server/proxy level
        ]
      }
    }]
  }
})
```

For self-hosted: headers are applied at the nginx/Caddy/reverse-proxy layer that sits in front of the Astro server.

## 4. Dependencies

### Remove
- `next`, `eslint-config-next`, `postcss`, `autoprefixer` (Astro/Tailwind integration manages PostCSS internally)

### Keep
- `react`, `react-dom`, `@types/react`, `@types/react-dom`, `typescript`
- `framer-motion`
- `tailwindcss`
- `@types/node`

### Add
- `astro` (latest)
- `@astrojs/react` (React island integration)
- `@astrojs/tailwind` (Tailwind integration)
- `@astrojs/sitemap` (sitemap generation)

## 5. Out of Scope

- Content changes: no new blog posts, no copy edits, no restructuring of existing content.
- Design changes: no layout, color, typography, or spacing modifications.
- Performance optimization beyond what Astro provides by default.
- Migration of `.superpowers/` or `.idea/` config files.
- Adding new pages or features.

## 6. Migration Order (Implementation Plan)

1. Scaffold new Astro project in a fresh directory.
2. Install integrations (`@astrojs/react`, `@astrojs/tailwind`, `@astrojs/sitemap`).
3. Port `globals.css` + `tailwind.config.ts` + fonts.
4. Create `Layout.astro` with SEO, JSON-LD, and font loading.
5. Port static React components (TechStack, Services, etc.) — no client directives needed.
6. Port interactive React islands (Contact, Hero, ThemeToggle, etc.) — replace Next.js imports.
7. Port Navbar and Footer — replace `next/link` with `<a>`.
8. Create blog content collection from `lib/blog.ts` data (split into `.md` files).
9. Implement `/blog` listing page (queries content collection, passes to BlogContent).
10. Implement `[slug].astro` individual post page.
11. Port `/api/contact` endpoint.
12. Port `sitemap.xml` via `@astrojs/sitemap`.
13. Configure security headers.
14. Test all pages for visual parity, dark/light mode, animations, form submission, blog search/filter.
15. Run build, clean up old Next.js artifacts.
