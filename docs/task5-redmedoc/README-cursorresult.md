# FishWise

FishWise is a small full-stack web app that suggests **beginner-friendly fishing setups**. You pick a **preset location** and a few **conditions** (time of day, weather, wind, optional target fish). The server runs a **simple rule-based engine** and returns species, bait, depth, sinker, float, and a short **explanation**.

There are **no accounts**, **no database**, and **no live weather or tide APIs**—everything is local data and rules, which keeps the project easy to run for a course assignment.

---

## Features

- **Preset fishing spots** with stable ids (aligned between frontend dropdown and backend data).
- **Condition form**: time of day, weather, wind level, optional target fish.
- **Recommendation card**: recommended fish, bait, line depth, sinker weight, float type, and explanation.
- **Validation**: required fields checked in the UI; invalid enums return a **400** JSON error from the API.
- **Rule engine**: tries an exact match on rules; if none match, returns a **fallback** recommendation for that spot.

---

## Tech stack

| Layer    | Technologies                          |
| -------- | ------------------------------------- |
| Frontend | React 18, Vite 5                      |
| Backend  | Node.js, Express 4                    |
| Other    | `cors` for browser requests from Vite |

---

## Project structure

```
fishwise/
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js              # Starts HTTP server (default port 3001)
│       ├── app.js                   # Express app: CORS, JSON, routes
│       ├── routes/
│       │   ├── spots.js             # GET /api/spots
│       │   └── recommendation.js    # POST /api/recommendation
│       ├── services/
│       │   └── recommendationService.js   # Validation + rule / fallback logic
│       └── data/
│           ├── fishingSpots.js      # Preset locations (ids, water type, common fish)
│           ├── recommendationRules.js     # Exact-match rules + explanations
│           └── fallbackRecommendation.js  # Last-resort defaults
├── frontend/
│   ├── package.json
│   ├── vite.config.js               # Dev proxy: /api → localhost:3001
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                  # Form state + fetch to API
│       ├── App.css
│       ├── components/
│       │   ├── FishingForm.jsx
│       │   └── RecommendationCard.jsx
│       └── data/
│           ├── fishingSpots.js      # Same spot ids as backend (dropdown labels)
│           └── mockRecommendation.js    # Optional reference / offline demo
└── docs/                            # Prompts, notes, assignment artifacts (optional)
```

---

## Prerequisites

- **Node.js** (LTS recommended, e.g. 18 or 20)
- **npm** (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

## Backend: setup and run

From the **repository root**:

```bash
cd backend
npm install
npm run dev
```

- **Dev (auto-restart on file changes):** `npm run dev`
- **Plain start:** `npm start`

Default URL: **http://localhost:3001**

Useful checks:

- **Health:** open or `curl` `http://localhost:3001/api/health` — should return JSON like `{ "status": "ok" }`.
- **Spots list:** `GET http://localhost:3001/api/spots`

Keep this terminal **open** while you use the frontend in development.

---

## Frontend: setup and run

Open a **second** terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite prints a local URL (usually **http://localhost:5173**). Open it in your browser.

The Vite dev server **proxies** requests starting with `/api` to `http://localhost:3001`, so the React app can call `fetch("/api/recommendation", …)` without CORS issues during local development.

**Important:** start the **backend first** (or at least before submitting the form), or the UI will show an error that it cannot reach the server.

### Production build (optional)

```bash
cd frontend
npm run build
npm run preview
```

> A production deployment would need a real API base URL or server configuration; the course MVP assumes **local dev** with both processes running.

---

## Recommendation flow (end to end)

1. User selects **location**, **time of day**, **weather**, **wind**, and optionally **target fish** in the React form.
2. On **Get Recommendation**, the frontend sends **POST `/api/recommendation`** with JSON:
   - `location`, `timeOfDay`, `weather`, `windLevel`, `targetFish` (optional string; can be empty).
3. **Express** validates the body. If something is wrong, it responds with **400** and an `error` / `fields` payload.
4. **`recommendationService`** looks for a rule that matches **all** of those fields (including `targetFish` as `null` when empty).
5. If a rule matches, the API returns that rule’s setup plus **`explanation`**.
6. If not, the service builds a **fallback** setup for that location (and still returns an **`explanation`**).
7. **`RecommendationCard`** displays the JSON fields the API returns (`recommendedFish`, `bait`, `lineDepth`, `sinkerWeight`, `floatType`, `explanation`, etc.).

---

## MVP limitations (what this project does *not* do)

- **No user accounts** or saved history.
- **No database**; spots and rules live in JavaScript modules.
- **No real-time weather, tides, or maps**—users type or select conditions manually.
- **Not a substitute for regulations**—recommendations are educational starters only; local fishing rules still apply.
- **Rule coverage is finite**—only certain combinations have exact rules; others use fallback logic.
- **CORS** in `backend/src/app.js` is configured for typical Vite dev origins (`localhost:5173`); other origins need to be added if you change ports or hosts.

---

## Future improvements (ideas for extensions)

- **Expand rules** or add a small scoring system so more combinations get tailored text without only “exact match or fallback.”
- **GET `/api/spots` in the UI** so the dropdown is always loaded from the server (single source of truth).
- **Tests** for validation and for “rule hit vs fallback” behavior (`jest` or `node:test`).
- **Environment variables** for `PORT` and API base URL for different machines.
- **Optional** local storage to save last recommendation (still no login).
- **Accessibility** pass (labels, focus order, live regions) and responsive layout polish.

---

## Troubleshooting (quick)

| Problem | What to try |
| ------- | ----------- |
| Blank explanation on the card | Ensure backend includes `explanation` in the JSON response (see `recommendationService.js`). |
| Network / fetch error in the UI | Backend running? Correct port **3001**? Frontend dev server running so `/api` proxy works? |
| CORS error | Use the Vite dev URL (`5173`) or add your origin in `backend/src/app.js`. |

---

## License / course use

Use and modify this project as needed for your class assignment; cite your course policy if you reuse substantial portions from teammates or public examples.
