# Website v3 Implementation Report — 6. listopadu 2025

This report summarizes recent work on the Next.js v3 website, fixes applied to documentation rendering, and what remains to be done.

---

## Overview

- Tech stack: Next.js (App Router), TypeScript, MDX docs, TailwindCSS.
- Goals:
  - Make documentation behave like V2 (single left sidebar, no right TOC, hidden footer on /docs).
  - Migrate/expand Whitepaper chapters (CZ), add Legacy section for v2.8.5.
  - Polish Navbar (icons, label changes), resolve MDX pitfalls, and stabilize builds.
  - Fix scrolling/display issues observed on docs pages.

---

## Changes Completed

### 1) Docs Layout Parity with V2
- Left sidebar only; no right-side TOC.
- Footer hidden on /docs using `ConditionalFooter`.
- Unified `MDXLayout` for docs subtree; cleaned up overlapping/duplicate app components.

### 2) Whitepaper Chapters (CZ)
- Completed chapters:
  - Architecture, Bridge, Economics (full), Security, Roadmap, Governance (full content, MDX-safe CZ).
- Governance page had a stray code fence previously; now resolved and replaced with structured content:
  - ZIP lifecycle, voting weights/thresholds, treasury principles, roles & mandates, emergency procedures, transparency & audits, 2025–2027 milestones.

### 3) Legacy (v2.8.5) Section
- Added new legacy landing pages under `/docs/legacy/*`.
- Created `legacy/whitepaper-2.8.5` with quick stats, TOC, and links to chapterized pages.
- Sidebar updated to include Legacy links.

### 4) Navbar polish
- Icons added; improved desktop/mobile menus.
- Label restored to “dApp” where requested.
- Addressed a previous JSX corruption—now fixed and validated.

### 5) Visual/FX enhancements (homepage only)
- Background modes (Starfield, NASA, Observatory, OSD Zoom) with a Theme panel.
- Subtle canvas overlays (meteors, bubbles, matrix rain) carefully layered (pointer-events none, controlled z-index).
- Kept these effects out of docs routes to avoid interference.

---

## Documentation Rendering & Scroll Fixes

Issue observed: “po scroll dolu …” (scroll/display oddity) and anchors obscured by the fixed header.

Fixes applied:
- Added a `#start` anchor at the top of docs main content for reliable skip-to-content targeting under a fixed navbar.
- Increased bottom padding on docs content to avoid the impression of truncated pages at the bottom (`pb-24/md:pb-28`).
- Added global CSS:
  - `html { scroll-behavior: smooth; }` for smoother anchor navigation.
  - `.prose :where(h1..h6) { scroll-margin-top: 96px; }` so in-page anchors don’t hide beneath the fixed header.

Expected result: smooth, predictable scrolling in docs, headings visible after anchor jumps, and no bottom cutoff feeling when reaching the end of a page.

---

## Deployment

- Last deploy command (rsync + remote build + PM2 restart) reported 200 OK for key endpoints.
- Current edits are committed to the repo (see commit below). If desired, I can run the deployment command again.

---

## What’s Next (High-Value TODO)

1) Legacy content
- Finish 1:1 migration of remaining legacy MD files:
  - CORE 2.8.5 (complete the rest), OASIS 2.8.5, Sacred Knowledge 2.8.5, Humanitarian Tithe 2.8.5, Victory 2025 (legacy).

2) Whitepaper expansion
- Add separate chapters for Consciousness Mining Game, Ecosystem & Community, and Competitive Analysis to match the already chapterized structure.

3) Docs UX
- Optional: add an on-page mini-TOC only for long articles (kept off by default to mirror V2).
- Add search (DocSearch or local search) when content stabilizes.

4) Build & QA
- Run a full build + link check on /docs/* to confirm 200 OK and catch any broken anchors.
- Establish a small MDX lint/CI to catch stray code fences and unescaped characters ahead of time.

5) Security & Infra (pre-MainNet)
- Track Q2 2026 third-party audit; prep scope, fixtures, and verification checklists.
- Continue binary-only integrity docs (checksums, signatures, SBOM, image scanning) and keep them in the Security chapter.

---

## Verification Notes
- Typecheck/Lint: Clean on updated files.
- MDX sanity: governance fixed; no stray fences; chapters render with consistent prose styling.
- Docs scrolling: anchor offset + bottom padding in place; skip link anchor available.

---

## Commit Reference
- Message: “docs: finalize governance, add legacy whitepaper, fix docs scroll anchors & padding, smooth scrolling”
- Branch: `main`

If you want, I can trigger a fresh deploy (rsync → remote build → PM2 restart → endpoint checks) now.
