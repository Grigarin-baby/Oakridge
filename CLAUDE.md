# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

College website for **Ilahiya Arts and Science College, Koyilandy** — built with Next.js 15 App Router, React 18, TypeScript, Tailwind CSS 3, and Framer Motion.

## Commands

- `npm run dev` — Start dev server with Turbopack (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint (next/core-web-vitals + next/typescript)

## Architecture

**Routing:** Next.js App Router under `src/app/`. Two entry points:
- `/` (`src/app/page.tsx`) — Landing page listing all institutions under Al Huda umbrella org. Clicking "Ilahiya Arts and Science College" navigates to `/main`.
- `/main` (`src/app/main/page.tsx`) — Main college homepage composed of numbered section components (FirstSection through FifthSection) with a 3-second loading animation gate.

**Key routes:** `/about`, `/about/faculty`, `/admission`, `/programmes`, `/gallery`, `/iqac`

**Layout:** Root layout (`src/app/layout.tsx`) loads the Arvo font via `next/font/google` and renders the global `Footer`. The `Navbar` is NOT in the layout — it's rendered inside individual pages/sections (e.g., `FirstSection`, `About`).

**Component structure:**
- `src/components/common/` — Reusable typography primitives: `Heading`, `SubHeading`, `SubText`, `TextLabel`, `Button`. These enforce consistent sizing/animation patterns. Use them instead of raw HTML heading tags.
- `src/components/sections/` — Homepage section components (`FirstSection` through `FifthSection`), each a self-contained section of `/main`.
- `src/components/animations/` — Animation wrappers: `ScrollAnimation`, `ScrollReveal`, `HoverAnimation`, `LoadingAnimation`.
- `src/components/Navbar.tsx` — Fixed navbar with scroll-aware styling, in-page hash navigation for `/main` sections, and animated mobile drawer.

**Styling:**
- Primary color: green-700 (`#15803d`). CSS variables defined in `globals.css` (`:root`). Note: `theme.config.css` has different (blue) values — `globals.css` takes precedence.
- Custom CSS classes: `.clip-hero` (diagonal green overlay), `.hero-image-container` (zoom-in entrance), `.hero-text-animate` (color cycling).
- Animation CSS in `src/app/styles/animations.css`.
- Tailwind custom font: `font-arvo` mapped to `--font-arvo` CSS variable.

**Path alias:** `@/*` maps to `./src/*` (configured in tsconfig.json).

**Key libraries:**
- `framer-motion` — Used extensively for scroll-triggered animations, page transitions, hover effects. Most components use `motion` elements with `whileInView`, `whileHover` variants.
- `lottie-react` — JSON animations in `public/images/` (book.json, arrow.json).
- `@emailjs/browser` — Contact form email sending.
- `react-icons` — Icon library (primarily `FaXxx` from Font Awesome set).
- `react-countup` — Animated number counters.

**Static assets:** All images in `public/images/`. Gallery photos in `public/images/gallery/all/`. Gallery metadata in `src/constants/galleryData.ts`.
