# FishWise 🎣

A beginner-friendly fishing recommendation web app built with **React + Vite** on the frontend and **Node.js + Express** on the backend.

## Project Overview

FishWise is a simple web app designed for casual and beginner fishers. Users select a preset fishing spot and a few basic conditions, and the app returns a beginner-friendly fishing recommendation.

The user selects:

- a preset fishing spot
- time of day
- weather
- wind level
- an optional target fish

The app then returns:

- `recommendedFish`
- `bait`
- `lineDepth`
- `sinkerWeight`
- `floatType`
- `explanation`

FishWise is built as an MVP, so it uses **local rule-based recommendation logic** only.

---

## Features

- Preset fishing spot selection
- Time of day selection
- Weather selection
- Wind level selection
- Optional target fish selection
- Beginner-friendly recommendation result card
- Local rule-based recommendation logic
- Simple frontend and backend structure
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

Example project structure:

```text
FishWise/
  frontend/
    src/
      components/
      data/
      App.jsx
      main.jsx
      App.css
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