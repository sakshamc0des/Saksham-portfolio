# Saksham Raghuvanshi – portfolio (React + Vite)

Multi-page, scroll-driven portfolio: dithered particle portrait, rotating 3D pixel objects, a round mascot
that follows your cursor, 5 colour palettes x dark/light.

## Run
```bash
npm install
cp .env.example .env   # then edit
npm run dev            # http://localhost:5173
npm run build          # outputs dist/
```

## All links live in `.env`
| Variable | Used for |
|---|---|
| `VITE_NAME`, `VITE_TAGLINE` | Header, landing title, page title |
| `VITE_EMAIL`, `VITE_PHONE` | Contact page, mail form |
| `VITE_LINKEDIN_URL`, `VITE_GITHUB_URL` | Contact page links |
| `VITE_LOCATION` | Contact page |
| `VITE_RESUME_URL` | Resume download (default `/resume.pdf` in `public/`) |
| `VITE_PORTRAIT_URL` | Landing photo (transparent-background image, 3:4) |

Vite only exposes variables that start with `VITE_`; restart `npm run dev` after editing `.env`.

## Where to edit content
- `src/projects.js` – the five projects (cards, positions on the map)
- `src/content.js` – Experience, Profile, Contact, Resume pages
- `src/palettes.js` – colour palettes (dark + light)
- `src/styles.css` – all styling

Routes are hash based (`#/projects/ambient`), so it deploys to any static host without rewrites.
