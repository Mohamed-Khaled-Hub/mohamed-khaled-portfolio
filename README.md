# Mohamed Khaled | Portfolio

Personal portfolio website of Mohamed Khaled, a full-stack software engineer. It presents my background, education, experience, projects and skills in a fast, fully static single-page site.

**Live site:** https://mohamed-khaled-portfolio-eta.vercel.app/

## Features

- Statically rendered page: all content is in the HTML, so it loads fast and is easy for search engines and link previews to read
- Content driven by a single JSON file, with no API calls or loading states
- Animated gradient background, staggered hero entrance and scroll-triggered section reveals, built with CSS so they stay off the main thread
- Scroll-linked progress line on the experience timeline
- Floating section navigation with active-section tracking
- Project and experience demo videos in a lazily loaded modal
- Images served from Cloudinary with automatic format and size selection, plus skeleton, retry and fallback states
- Respects `prefers-reduced-motion`
- Responsive, dark-only design

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) and [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for the scroll-linked timeline progress
- [Lucide](https://lucide.dev/) icons
- ESLint and Prettier
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm

### Installation

```bash
git clone https://github.com/Mohamed-Khaled-Hub/mohamed-khaled-portfolio
cd mohamed-khaled-portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production build

```bash
npm run build
npm start
```

Always measure performance on a production build, since the development server is much slower.

## Scripts

| Script                 | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the development server     |
| `npm run build`        | Create an optimized build        |
| `npm start`            | Serve the production build       |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format all files with Prettier   |
| `npm run format:check` | Check formatting without writing |

## Project Structure

```
.
├── app/
│   ├── favicon.ico          # Site icon
│   ├── layout.tsx           # Root layout, metadata, font and background
│   └── page.tsx             # Home page (server component)
├── public/                  # Static assets
└── src/
    ├── components/
    │   ├── PageRelated/     # Hero, timeline, section nav, reveal, chips, titles
    │   ├── UiRelated/       # Shared UI: image, external link, background
    │   └── VideoRelated/    # Demo button and video modal
    ├── data/                # Portfolio content (JSON)
    ├── fonts/               # Font setup
    ├── styles/              # Global and per-component CSS
    ├── types/               # TypeScript types
    └── utils/               # Helpers and constants
```

## Updating the Content

All portfolio content lives in `src/data/mohamed-khaled-info.json`: personal details, summary, education, experience, projects, skills and additional information. Edit the JSON and the page updates; no component changes are needed.

The shape of the data is defined in `src/types/portfolio.types.ts`. If you add a new field, update the type and the component that renders it.

## Performance Notes

- The home page is a server component and the data is imported at build time, so there is no client-side fetching.
- Client components are limited to the parts that need the browser: reveal observers, the section nav, the timeline progress line, the image loader and the video modal.
- Entrance and background animations use CSS and only animate `transform` and `opacity`.
- The video modal is code-split and loaded only when a demo is opened.

## Deployment

The site is deployed on Vercel. Pushing to the main branch triggers a new production deployment. Any platform that supports Next.js will work as well.

## Author

**Mohamed Khaled**, Software Engineer, Alexandria, Egypt
