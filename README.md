# Portfolio Audit & Upgrade Plan

## Executive Summary
This document serves as the structural audit and execution plan for transforming the existing Astro codebase into a high-impact **Software Consultant / Backend & Systems Engineer** portfolio.

---

## Section-by-Section Audit

| Existing Section | Current Issue / Problem | Proposed Change | Affected Component(s) | Data / Content Source | New Component Required? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Navbar & Header** | Displays agency brand "SUNSTAR CONSULTANCY" and agency nav items ("Services", "Process", "Why Us"). | Rebrand to Principal Software Engineer portfolio header. Update navigation to: About, Experience, Case Studies, Skills, Leadership, Contact. Add "Resume" link. | `src/components/layout/Navbar.tsx`, `src/layouts/Layout.astro` | Personal branding / Resume | No |
| **Hero Section** | Agency slogan "Building Reliable Software That Scales", "Book Consultation" CTA, generic metrics (99.9% Uptime, 50+ Projects). | Positioning hero: **Principal Software Engineer**, subtitle "Building backend systems that survive production", 8+ years experience summary, CTAs for Resume & Contact, and prominent metrics: **8+ Years**, **42 GB → 1.5 GB Memory Reduced**, **4 Engineers Led (Pintek)**, **7 Engineers Led (Media-artists)**. | `src/components/sections/Hero.tsx` | Resume Step 4 & 6 | No |
| **TechStack Section** | Generic tech badges. | Reorganize into structured engineering categories: Backend, Frontend, Databases, Distributed Systems, Cloud, Tools. No fake percentage bars. | `src/components/sections/TechStack.tsx` | Resume Step 9 | No |
| **Services Section** | Agency service offerings (Custom Go Dev, PHP Modernization, etc.). | Repurpose/Replace with **Engineering Story / About & Technical Leadership** highlighting fintech/payment systems, production engineering, code reviews, mentoring, and system design. | `src/components/sections/Services.tsx` (or rename/replace with `About.tsx` & `Leadership.tsx`) | Resume Step 5 & 10 | Replaced with `About.tsx` & `Leadership.tsx` |
| **WhyChooseUs & Process** | Agency pitch ("Why Hire Us", "4-Step Process"). | Replace with **Case Studies / Featured Engineering Work** (Performance Optimization 42GB → 1.5GB, Payment Reliability, Iceberg Partner Module, Control Room, OpenFinance, Pintek) + **Engineering Philosophy** (Measure before optimizing, Reliability matters, Fix root causes). | `src/components/sections/WhyChooseUs.tsx`, `src/components/sections/Process.tsx` | Resume Step 8 & 12 | Replaced with `CaseStudies.tsx` & `Philosophy.tsx` |
| **Portfolio Section** | General client project showcase. | Repurpose into **Career Experience Timeline** detailing Ayopop (Principal SE), Eastern Enterprises (Lead Dev), D.J. Alexander (Developer), Envisiodevs (Production Eng), Freelance. | `src/components/sections/Portfolio.tsx` (or `Experience.tsx`) | Resume Step 7 & 11 | Replaced with `Experience.tsx` |
| **Testimonials Section** | Client reviews for agency. | Replace or remove in favor of **Technical Visualizations / Architecture Diagrams** (Payment Reliability flow & Performance Optimization pipeline). | `src/components/sections/Testimonials.tsx` | Resume Step 14 | Replaced with `Visualizations.tsx` |
| **Blog Section** | Astro content collection blog. | Retain as-is with minor copy adjustments to align with senior engineering thoughts. | `src/components/sections/BlogSection.tsx` | Astro content files | No |
| **Contact & Footer** | Agency contact form & copyright. | Update messaging for engineering inquiries, direct email/LinkedIn, resume download, copyright to Suraj Gusain. | `src/components/sections/Contact.tsx`, `src/components/sections/Footer.tsx` | Resume Step 16 | No |
| **SEO & Meta** | Consultancy keywords & titles. | Update title to `Principal Software Engineer | Backend, Fintech & Distributed Systems`, OpenGraph metadata, structured JSON-LD schema. | `src/layouts/Layout.astro`, `src/lib/schema.ts` | Step 15 | No |

---

## Technical Guidelines
1. **Preserve Astro Architecture**: Keep Astro SSR/SSG setup, Tailwind CSS theme, Framer Motion animations, font configurations, and asset pipeline intact.
2. **Minimal & Senior Visual Design**: Clean, dark-themed, modern typography, zero generic developer illustrations or fake percentage bars.
3. **Accessibility & Responsive**: Full keyboard access, semantic HTML, mobile responsiveness, zero horizontal overflow.
