# FishWise

A beginner-friendly web app that helps casual fishers get personalized fishing recommendations based on location and weather conditions. Built with React and Node.js/Express.

## Project Overview

FishWise solves a simple problem: What should I fish for, and how should I rig my line, given my current location and conditions?

Users select a fishing spot and enter details about the water, time, weather, and wind. The app's rule-based recommendation engine then suggests:
- What fish species to target
- What bait to use
- How deep to fish
- What sinker weight to use
- What float type to use
- Why these choices work for the conditions

**Perfect for:** Beginners who want to fish smarter without needing years of experience.

## Features

- 🎣 **5 preset fishing locations** with automatic water type detection
- 🌤️ **Condition-based recommendations** (time, weather, wind)
- 🐟 **Specific rigging advice** (depth, sinker, float, bait)
- 📱 **Simple, mobile-friendly interface** 
- ⚡ **No login required** — instant recommendations
- 🧠 **Smart fallback logic** — always gets a recommendation, even for unusual conditions

## Tech Stack

**Frontend:**
- React 18+ with Hooks
- Vanilla CSS (no external frameworks)
- Fetch API for backend communication

**Backend:**
- Node.js + Express
- Rule-based recommendation engine
- Local JSON data (no database required)

**Deployment-ready:** No external APIs, no database dependencies, fully self-contained.

## Project Structure

```
fishwise/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Main form component
│   │   │   └── HomePage.css      # Styling
│   │   ├── services/
│   │   │   └── recommendationService.js  # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── backend/               # Express API
│   ├── src/
│   │   ├── App.js         # Server entry point
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   └── data/          # Fishing spots, rules, fallbacks
│   └── package.json
├── docs/                  # Documentation
│   └── task1-requirements-notes.md
└── README.md             # This file
```

## How to Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app opens at `http://localhost:5173`

**Build for production:**
```bash
npm run build
```

## How to Run the Backend

```bash
cd backend
npm install
npm start
```

Backend runs at `http://localhost:5000`

**Test it:**
```bash
curl http://localhost:5000/api/health
```

## Recommendation Flow

```
User fills form (location, time, weather, wind)
        ↓
Frontend sends POST /api/recommendation
        ↓
Backend looks up location's water type
        ↓
Rule engine matches best conditions
  ├─ Exact match? Use that rule
  ├─ Partial match? Use best fit
  └─ No match? Use fallback recommendation
        ↓
Returns: fish, bait, depth, sinker, float, explanation
        ↓
Frontend displays in nice card format
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| GET | `/api/spots` | List all fishing locations |
| POST | `/api/recommendation` | Get recommendation for conditions |

**Example request:**
```bash
curl -X POST http://localhost:5000/api/recommendation \
  -H "Content-Type: application/json" \
  -d '{
    "location": "lake-riverside",
    "timeOfDay": "morning",
    "weather": "sunny",
    "windLevel": "low",
    "targetFish": "trout"
  }'
```

## MVP Limitations

This is version 1.0 — intentionally simplified to be quick to build and easy to understand:

- ✋ **No user accounts** — Stateless, no saved data
- 📡 **No real-time weather** — User enters conditions manually
- 🌊 **No tide data** — Simplified for MVP
- 💾 **No database** — All data is hardcoded
- 🤖 **No machine learning** — Simple rule matching
- 🌐 **Only 5 fishing spots** — Easy to expand later

## Future Improvements

- User accounts with saved favorite locations and past catches
- Real weather API integration (OpenWeatherMap)
- Tide API for coastal locations (NOAA)
- Expand to 50+ fishing spots
- More fish species and regional variations
- Photo gallery for each fish species
- Mobile app (React Native)
- User ratings to improve recommendations
- Multi-language support
- Integration with fishing reports API

## Learning Value

**Great for students learning:**
- Full-stack web development (React + Node.js)
- Building rule-based systems
- API design and REST principles
- Form handling and validation
- State management
- Frontend-backend communication
- How to scope an MVP
- Git workflow

## Getting Started

1. Clone the repo
2. Follow "How to Run" sections above
3. Explore the code — it's student-friendly and well-commented
4. Try modifying the rules in `backend/src/data/` to add new fish or conditions
5. Customize the styling in `frontend/src/pages/HomePage.css`

## Questions?

Check the docs in `/docs/` or review the inline comments in the code.