# Alins Technologies — Agency Website

A modern, animated, dark-themed website for **Alins Technologies**, built as a two-folder
monorepo: a React frontend and an Express backend API. All content is placeholder text —
replace it with real copy, images and brand assets before going live.

## Folder Structure

```
Alins/
├── frontend/                  # React + Vite website
│   ├── public/                # Static assets (favicon, etc.)
│   ├── src/
│   │   ├── assets/            # Images/fonts you add later
│   │   ├── components/
│   │   │   ├── common/        # Logo, buttons, cursor, preloader, counters...
│   │   │   ├── layout/        # Navbar, Footer, page Layout wrapper
│   │   │   ├── sections/      # Hero, Services, Portfolio, Testimonials, CTA...
│   │   │   └── three/         # 3D scenes (React Three Fiber)
│   │   ├── data/               # Placeholder content (services, portfolio, team...)
│   │   ├── pages/               # Home, About, Services, Portfolio, Contact, 404
│   │   ├── styles/              # Tailwind entry + global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                   # Express API (contact form, services data)
│   ├── src/
│   │   ├── config/             # Env config
│   │   ├── controllers/        # Route handlers
│   │   ├── data/                # Placeholder services data
│   │   ├── middleware/          # 404 + error handler
│   │   ├── models/               # JSON-file contact store (swap for a DB later)
│   │   ├── routes/               # /api routes
│   │   └── app.js
│   ├── data/contacts.json       # Saved contact form submissions (gitignored)
│   ├── server.js
│   └── package.json
│
└── package.json                # Convenience scripts to run both together
```

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Three Fiber + drei (3D),
  React Router, Lucide icons.
- **Backend:** Node.js, Express, Helmet, CORS, express-rate-limit, Nodemailer (optional email),
  a simple JSON-file store for contact submissions (swap for a real DB when ready).

## Design

- **Theme:** Dark, modern, "trendy" agency aesthetic — deep navy/black background with a
  **blue → cyan gradient accent** (matches the blue logo mark), glassmorphism cards, glow/blur
  effects, grain/noise overlay.
- **Motion:** Page-load preloader, scroll-triggered reveals, animated stat counters, magnetic
  buttons, custom cursor, animated gradient nav pill, marquee strip, floating 3D shapes, a
  distorted/animated 3D sphere hero scene, page-transition animations between routes.
- **Pages:** Home, About, Services, Portfolio (filterable), Contact (working form wired to the
  backend), 404 — all sharing a persistent animated Navbar + Footer.

## Getting Started

### 1. Install dependencies

```bash
# from the Alins/ root — installs frontend + backend + root tooling
npm run install:all
npm install
```

### 2. Configure environment variables

Each app has a `.env.example` — copy it to `.env` and adjust as needed:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

- `frontend/.env` → `VITE_API_URL` (where the backend runs, default `http://localhost:5000`)
- `backend/.env` → SMTP settings are **optional**; without them, contact form submissions are
  still saved to `backend/data/contacts.json` and logged to the console instead of emailed.
  Set `ADMIN_KEY` to view submissions via `GET /api/contact` (header `x-admin-key`).

### 3. Run both apps together

```bash
npm run dev
```

This starts the frontend at **http://localhost:5173** and the backend at
**http://localhost:5000** in parallel. Or run them individually:

```bash
npm run dev:frontend
npm run dev:backend
```

### 4. Build for production

```bash
npm run build:frontend   # outputs to frontend/dist
```

Deploy `frontend/dist` as a static site (Vercel/Netlify/etc.) and `backend/` as a Node service
(Render/Railway/EC2/etc.), pointing `VITE_API_URL` at your deployed backend URL.

## Next Steps Before Launch

- Swap all placeholder text/images/logo for real Alins Technologies brand assets.
- Replace the placeholder portfolio items and testimonials with real client work (with
  permission) and real reviews.
- Point the contact form's SMTP settings at a real mailbox, or connect a CRM.
- Add real social links in `frontend/src/components/layout/Footer.jsx`.
- Consider a real database (MongoDB/Postgres) once contact volume grows —
  `backend/src/models/contactStore.js` is written so it's a drop-in swap.
