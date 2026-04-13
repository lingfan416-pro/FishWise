# FishWise 🎣

![React](https://img.shields.io/badge/frontend-React-61dafb)
![Vite](https://img.shields.io/badge/build-Vite-646cff)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933)
![Express](https://img.shields.io/badge/api-Express-000000)
![Status](https://img.shields.io/badge/status-MVP-orange)

FishWise is a beginner-friendly fishing recommendation web app built with **React + Vite** on the frontend and **Node.js + Express** on the backend.

It helps casual and beginner fishers choose a simple fishing setup based on a preset fishing spot and a few selected conditions.

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

This project is designed as an MVP, so it uses **local rule-based logic only**.

---

## Features

- Preset fishing spot selection
- Time of day selection
- Weather selection
- Wind level selection
- Optional target fish selection
- Beginner-friendly recommendation card
- Rule-based recommendation logic
- Simple React frontend
- Simple Express backend
- Local data only
- No database
- No authentication
- No external weather or tide APIs
- No machine learning

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

### Data and Logic
- Local JavaScript or JSON files
- Rule-based recommendation matching

---

## Project Structure

```text
FishWise/
  frontend/
    src/
      components/
      data/
      App.jsx
      App.css
      main.jsx
    package.json
    vite.config.js

  backend/
    src/
      routes/
      services/
      data/
      app.js
      server.js
    package.json
```

### Folder Explanation

#### Frontend
- `App.jsx` – main page
- `components/` – reusable UI components such as the form and recommendation card
- `data/` – optional mock data for frontend preview
- `App.css` – simple styling

#### Backend
- `routes/` – API endpoint definitions
- `services/` – recommendation logic
- `data/` – local fishing spot data and recommendation rules
- `app.js` – Express app setup
- `server.js` – server startup

---

## Quick Start

### 1. Clone the project

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

The backend should run on:

```bash
http://localhost:3001
```

### 3. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend should run on:

```bash
http://localhost:5173
```

---

## How to Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the Vite local URL shown in the terminal.

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

Then open:

```bash
http://localhost:3001
```

---

## API Endpoints

### `GET /api/spots`

Returns the preset fishing spots.

Example:

```http
GET /api/spots
```

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
    "waterType": "freshwater"
  }
]
```

---

### `POST /api/recommendation`

Returns a fishing recommendation based on the selected conditions.

Example request:

```http
POST /api/recommendation
Content-Type: application/json
```

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
The frontend does not send `waterType`.

The backend looks up the selected fishing spot and derives the water type from local fishing spot data.

### Step 4: Backend checks local rules
The backend compares the request with local rule-based recommendation data.

### Step 5: Backend returns a recommendation
- If an exact rule matches, the backend returns that recommendation.
- If no exact rule matches, the backend returns a fallback recommendation using the same response shape.

### Step 6: Frontend displays the result
The React frontend renders the recommendation in a recommendation card.

---

## Screenshots

Add screenshots here after the UI is ready.

### Main Page
![Main Page](./screenshots/main-page.png)

### Recommendation Result
![Recommendation Result](./screenshots/recommendation-result.png)

> If you do not have screenshots yet, you can keep this section and add the images later.

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

## Future Improvements

Possible future improvements include:

- Add more fishing spots
- Add more fish species
- Add more recommendation rules
- Improve fallback logic
- Add better frontend validation
- Add loading and error states
- Connect to weather APIs
- Connect to tide APIs
- Add map-based location selection
- Add a database
- Add user accounts and saved recommendations
- Improve mobile responsiveness

---

## Constraints

This project follows these MVP constraints:

- No database
- No authentication
- No external weather or tide APIs
- No machine learning
- Rule-based recommendation only
- Local JS or JSON files only

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
