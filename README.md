# Sara Alshikha — Portfolio

A premium bilingual (Arabic/English) portfolio website for Sara Alshikha, showcasing 19 years of executive leadership, media innovation, and visual artistry.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 3**
- **Framer Motion** — page transitions & animations
- **Lenis** — smooth scrolling
- **Lucide React** — icons
- **Formspree** — contact form

## Getting Started

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## Deployment (Vercel)

1. Push the repo to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no extra config needed
4. The `vercel.json` file handles SPA routing

## Content Management

All editable content lives in `src/data/`. See **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** for detailed instructions on how to add or modify projects, certificates, and other content.

## Project Structure

```
src/
├── assets/          # Static images (hero photo)
├── components/      # Reusable UI components
│   ├── layout/      # Navbar, Footer, Layout
│   ├── sections/    # Page sections (CareerTimeline, etc.)
│   └── ui/          # Cards, Buttons, Animations, Lightbox
├── context/         # Language context (AR/EN translations)
├── data/            # All editable content (projects, certs, etc.)
└── pages/           # Route pages (Home, About, Portfolio, etc.)
```
