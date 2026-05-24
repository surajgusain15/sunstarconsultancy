# SUNSTAR Next.js → Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate SUNSTAR CONSULTANCY website from Next.js 16 to Astro with React islands, zero visual/functional regression.

**Architecture:** Astro `hybrid` output — static pages for homepage + blog, server endpoint for contact API. React components kept as client islands for interactivity (framer-motion, form, particles). Blog content restructured as Astro Content Collections.

**Tech Stack:** Astro 5, React 18, TypeScript 5, Tailwind CSS 3, Framer Motion 11, Cloudflare Turnstile

**Spec:** `docs/superpowers/specs/2026-05-24-sunstar-nextjs-to-astro-migration-design.md`

---

## File Structure (Target)

```
/Users/surajgusain/go/src/sunstarconsultancy/
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── api/
│   │       └── contact.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.tsx
│   │   │   └── Navbar.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── BlogContent.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── AnimatedDiv.tsx
│   │       ├── AnimatedCounter.tsx
│   │       ├── Button.tsx
│   │       ├── HashScrollHandler.tsx
│   │       ├── ParticleBackground.tsx
│   │       ├── ScrollToTop.tsx
│   │       └── ThemeToggle.tsx
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/
│   │       ├── building-scalable-apis-in-go.md
│   │       ├── go-concurrency-patterns.md
│   │       ├── php-modernization-strategies.md
│   │       ├── kubernetes-best-practices-for-startups.md
│   │       └── microservices-architecture-patterns.md
│   ├── lib/
│   │   └── schema.ts
│   └── styles/
│       └── global.css
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

### Task 1: Scaffold Astro Project & Install Dependencies

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Astro project**

Run in `/Users/surajgusain/go/src/sunstarconsultancy`:

```bash
# Remove old Next.js node_modules to avoid confusion
rm -rf node_modules package-lock.json next-env.d.ts

# Create fresh package.json
cat > package.json << 'EOF'
{
  "name": "sunstarconsultancy",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "astro": "^5.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@astrojs/react": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.12.0",
    "tailwindcss": "^3.4.0"
  }
}
EOF
```

- [ ] **Step 2: Create astro.config.mjs**

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sunstarconsultancy.com",
  output: "hybrid",
  integrations: [react(), tailwind(), sitemap()],
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.astro"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
.DS_Store
*.log
.vercel
coverage/
.env.local
.env*.local
*.tsbuildinfo
.idea
.superpowers
```

- [ ] **Step 5: Create src directory structure**

```bash
mkdir -p src/components/layout src/components/sections src/components/ui src/content/blog src/layouts src/lib src/pages/api src/styles public
```

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` created.

- [ ] **Step 7: Run initial Astro check**

```bash
npx astro check
```

Expected: No errors (empty project is fine).

---

### Task 2: Port Global Styles & Tailwind Config

**Files:**
- Copy: `tailwind.config.ts` (unchanged from Next.js)
- Create: `src/styles/global.css`
- Delete: `app/globals.css`
- Delete: `postcss.config.mjs`

- [ ] **Step 1: Copy tailwind.config.ts**

```bash
cp tailwind.config.ts tailwind.config.ts
```

The file stays in the project root (same location). Content is unchanged from the Next.js version — it already has the correct `content` paths for `./src/**/*.{ts,tsx,astro}`.

Update the `content` array in `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,astro}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f3f8",
          100: "#d9e0ed",
          200: "#b3c1db",
          300: "#8da2c9",
          400: "#6783b7",
          500: "#4a6fa5",
          600: "#3a5a8a",
          700: "#2a456f",
          800: "#1a2a4a",
          900: "#0a1628",
          950: "#050e1a",
        },
        gold: {
          50: "#fdf8ed",
          100: "#f9edcc",
          200: "#f3db99",
          300: "#edc966",
          400: "#e0b84a",
          500: "#d4a853",
          600: "#b88a2e",
          700: "#8c6822",
          800: "#604719",
          900: "#34260d",
          950: "#1a1306",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Create src/styles/global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

@layer base {
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f6f0;
    --bg-card: #f8f6f0;
    --text-primary: #0a1628;
    --text-secondary: #4a5568;
    --text-muted: #a0aec0;
    --border: #e2e8f0;
    --nav-bg: rgba(255, 255, 255, 0.8);
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
  }

  .dark {
    --bg-primary: #0a1628;
    --bg-secondary: #050e1a;
    --bg-card: #1a2a4a;
    --text-primary: #ffffff;
    --text-secondary: #cbd5e0;
    --text-muted: #718096;
    --border: #2a456f;
    --nav-bg: rgba(10, 22, 40, 0.8);
  }

  * {
    @apply border-[var(--border)];
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-[var(--bg-primary)] text-[var(--text-primary)] font-body transition-colors duration-300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    @apply bg-gold-500/30 text-[var(--text-primary)];
  }

  .dark ::selection {
    @apply bg-gold-500/40 text-white;
  }
}

@layer components {
  .section-container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-20 md:py-28 lg:py-32;
  }

  .glass {
    @apply backdrop-blur-xl bg-[var(--nav-bg)];
  }

  .glass-card {
    @apply backdrop-blur-md border border-[var(--border)] rounded-2xl;
    background-color: color-mix(in srgb, var(--bg-card) 80%, transparent);
  }

  .gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600;
  }

  .gold-glow {
    box-shadow: 0 0 20px rgba(212, 168, 83, 0.15), 0 0 60px rgba(212, 168, 83, 0.05);
  }
}
```

- [ ] **Step 3: Remove old Next.js files**

```bash
rm -rf app/ postcss.config.mjs
```

- [ ] **Step 4: Verify build**

```bash
npx astro build
```

Expected: Build succeeds (minimal output since no pages yet).

---

### Task 3: Create Layout.astro

**Files:**
- Create: `src/layouts/Layout.astro`
- Keep: `src/lib/schema.ts` (no changes needed)

- [ ] **Step 1: Create src/layouts/Layout.astro**

```astro
---
import { organizationSchema } from "@/lib/schema";

export interface Props {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  noIndex?: boolean;
}

const { title, description, ogTitle, ogDescription, canonical, noIndex } = Astro.props;
const siteUrl = "https://sunstarconsultancy.com";
const defaultTitle = "SUNSTAR CONSULTANCY | Software Development & Engineering Consulting";
const fullTitle = title === defaultTitle ? title : `${title} | SUNSTAR CONSULTANCY`;
---

<!DOCTYPE html>
<html lang="en" class="dark" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="Go development, PHP development, software consultancy, microservices, backend systems, cloud-native, software modernization, API development" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="SUNSTAR CONSULTANCY" />
    <meta property="og:title" content={ogTitle || fullTitle} />
    <meta property="og:description" content={ogDescription || description} />
    <link rel="canonical" href={canonical || `${siteUrl}${Astro.url.pathname}`} />
    {noIndex && <meta name="robots" content="noindex, nofollow" />}
    {!noIndex && <meta name="robots" content="index, follow" />}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <script>
      // Theme initialization - prevent flash
      (function() {
        try {
          var theme = localStorage.getItem('theme');
          var isDark = theme === 'dark' || !theme;
          document.documentElement.classList.toggle('dark', isDark);
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        } catch(e) {}
      })();
    </script>
  </head>
  <body>
    <slot name="navbar" />
    <slot name="hash-scroll" />
    <slot name="scroll-to-top" />
    <main class="min-h-screen">
      <slot />
    </main>
    <slot name="footer" />
    <script type="application/ld+json" set:html={JSON.stringify(organizationSchema)} />
  </body>
</html>
```

- [ ] **Step 2: Verify src/lib/schema.ts exists**

Read `/Users/surajgusain/go/src/sunstarconsultancy/lib/schema.ts` — copy it to `src/lib/schema.ts`:

```ts
export const SITE_URL = "https://sunstarconsultancy.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SUNSTAR CONSULTANCY",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Specialized in Go and PHP application development, backend systems, software modernization and long-term engineering support.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@sunstarconsultancy.com",
  },
  sameAs: [
    "https://github.com/sunstarconsultancy",
    "https://linkedin.com/company/sunstarconsultancy",
  ],
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: { "@type": "Organization", name: "SUNSTAR CONSULTANCY" },
  areaServed: "Worldwide",
  description:
    "Go and PHP development, microservices, cloud-native applications, software modernization.",
};
```

- [ ] **Step 3: Delete old lib files**

```bash
rm -rf lib/
```

- [ ] **Step 4: Verify build**

```bash
npx astro build
```

Expected: Build succeeds (layout exists, even if no pages use it yet).
