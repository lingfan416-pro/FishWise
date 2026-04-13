# FishWise 🎣

![React](https://img.shields.io/badge/frontend-React-61dafb)
![Vite](https://img.shields.io/badge/build-Vite-646cff)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933)
![Express](https://img.shields.io/badge/api-Express-000000)
![Status](https://img.shields.io/badge/status-MVP-orange)

FishWise is a beginner-friendly fishing recommendation web app built with **React + Vite** on the frontend and **Node.js + Express** on the backend.

It helps casual and beginner fishers choose a simple fishing setup based on a **preset fishing spot** and a few selected conditions.

---

## Project Overview

In FishWise, users select:

- a preset fishing spot
- time of day
- weather
- wind level
- an optional target fish

The app then returns a recommendation with:

- `recommendedFish`
- `bait`
- `lineDepth`
- `sinkerWeight`
- `floatType`
- `explanation`

FishWise is intentionally built as an **MVP**. It uses **local rule-based logic only** and does not rely on a database, external APIs, or machine learning.

---

## Features

- Preset fishing spot selection
- Time of day, weather, and wind level selection
- Optional target fish selection
- Beginner-friendly recommendation card
- Rule-based recommendation logic
- Frontend-backend integration through a simple REST API
- Local data only
- No database
- No authentication
- No external weather or tide APIs
- No machine learning
- Fallback recommendation when no exact rule matches

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express
- `cors`

### Data and Logic
- Local JavaScript modules
- Rule-based recommendation matching

---

## Example Project Structure

```text
FishWise/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── components/
│       │   ├── FishingForm.jsx
│       │   └── RecommendationCard.jsx
│       └── data/
│           ├── fishingSpots.js
│           └── mockRecommendation.js
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── routes/
│       │   ├── spots.js
│       │   └── recommendation.js
│       ├── services/
│       │   └── recommendationService.js
│       └── data/
│           ├── fishingSpots.js
│           ├── recommendationRules.js
│           └── fallbackRecommendation.js
└── README.md
```

### Folder Explanation

#### Frontend
- `App.jsx` — main page
- `components/` — reusable UI parts such as the form and recommendation card
- `data/` — local reference data used during frontend development
- `App.css` — simple styling

#### Backend
- `routes/` — API endpoint definitions
- `services/` — recommendation logic and validation
- `data/` — fishing spot data, recommendation rules, and fallback configuration
- `app.js` — Express app setup
- `server.js` — server startup

---

## Prerequisites

- **Node.js** (LTS recommended, for example 18 or 20)
- **npm** (comes with Node.js)

Check your versions:

```bash
node -v
npm -v
```

---

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd FishWise
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend should run at:

```text
http://localhost:3001
```

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend should run at a Vite URL such as:

```text
http://localhost:5173
```

---

## How to Run the Backend

```bash
cd backend
npm install
npm run dev
```

Or:

```bash
npm start
```

Useful checks:

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/spots
```

Keep the backend terminal running while using the frontend in development.

---

## How to Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the Vite local URL shown in the terminal.

The frontend is configured to call the backend through `/api` during development. The Vite dev server proxies `/api` requests to `http://localhost:3001`.

**Important:** start the backend before submitting the form, otherwise the frontend will not be able to fetch recommendations.

### Optional production preview

```bash
npm run build
npm run preview
```

---

## API Endpoints

### `GET /api/spots`

Returns the preset fishing spots.

Example response:

```json
[
  {
    "id": "mission-bay-wharf",
    "name": "Mission Bay Wharf",
    "waterType": "coastal"
  },
  {
    "id": "lake-riverside",
    "name": "Lake Riverside",
    "waterType": "lake"
  }
]
```

### `POST /api/recommendation`

Returns a fishing recommendation based on the selected conditions.

Example request:

```json
{
  "location": "mission-bay-wharf",
  "timeOfDay": "morning",
  "weather": "sunny",
  "windLevel": "low",
  "targetFish": "snapper"
}
```

Example response:

```json
{
  "selectedSpotName": "Mission Bay Wharf",
  "waterType": "coastal",
  "targetFish": "snapper",
  "recommendedFish": "snapper",
  "bait": "pilchard strips",
  "lineDepth": "near bottom",
  "sinkerWeight": "medium",
  "floatType": "none",
  "explanation": "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}
```

---

## How the Recommendation Flow Works

### Step 1: User selects fishing conditions
The user selects:
- fishing spot
- time of day
- weather
- wind level
- optional target fish

### Step 2: Frontend sends data to backend
The React frontend sends the selected values to:

```http
POST /api/recommendation
```

### Step 3: Backend derives water type
The frontend does **not** send `waterType`.

The backend looks up the selected fishing spot and derives the water type from local fishing spot data.

### Step 4: Backend checks local rules
The backend compares the request against local rule-based recommendation data.

### Step 5: Backend returns a recommendation
- If an exact rule matches, the backend returns that recommendation.
- If no exact rule matches, the backend returns a fallback recommendation using the same response shape.

### Step 6: Frontend displays the result
The React frontend renders the returned recommendation in a recommendation card.

---

## Screenshots

Add screenshots here before final submission if you want to improve the README.

### Main Page
`./screenshots/main-page.png`

### Recommendation Result
`./screenshots/recommendation-result.png`

If you do not plan to include screenshots, remove this section before submission.

---

## MVP Limitations

FishWise is intentionally simple in this first version.

### Current limitations
- No database
- No authentication or user accounts
- No saved recommendation history
- No real-time weather API
- No tide API
- No GPS or map integration
- No machine learning
- Limited rule coverage
- Recommendations only work for preset fishing spots and local rules included in the project

This means FishWise is an MVP for learning and demonstration, not a full real-world fishing planning system.

---

## Troubleshooting

| Problem | What to check |
|---|---|
| Blank explanation on the card | Confirm the backend returns `explanation` in the recommendation JSON. |
| Fetch or network error in the UI | Make sure the backend is running on port `3001` and the frontend dev server is running. |
| CORS error | Use the Vite dev URL or update allowed origins in `backend/src/app.js`. |
| No recommendation appears | Check the browser console and backend terminal for validation errors or failed requests. |

---

## Future Improvements

Possible future improvements include:

- Add more fishing spots
- Add more fish species
- Add more recommendation rules
- Improve fallback logic
- Add better frontend validation and error messages
- Add loading and error states
- Connect to weather APIs
- Connect to tide APIs
- Add map-based location selection
- Add a database
- Add user accounts and saved recommendations
- Improve mobile responsiveness
- Add tests for validation and recommendation logic

---

## Constraints

This project follows these MVP constraints:

- No database
- No authentication
- No external weather or tide APIs
- No machine learning
- Rule-based recommendation only
- Local JavaScript data files only

---

## Project Goal

The goal of FishWise is to build a clear and beginner-friendly full-stack web app that demonstrates:

- React frontend development
- Express backend development
- frontend-backend integration
- local rule-based recommendation logic
- clean and readable project structure

---

## Notes

FishWise is a student-friendly MVP project. The recommendation logic is intentionally simple so it is easy to understand, test, and improve later.
