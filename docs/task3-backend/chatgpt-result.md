I’m putting this into a small, student-friendly Express structure with local data files and one simple recommendation service.

Thought for 1m 38s

Here is a simple backend starter for FishWise using Node.js + Express.

1. Beginner-friendly folder structure
fishwise-backend/
  package.json
  src/
    app.js
    server.js
    routes/
      spots.js
      recommendation.js
    data/
      fishingSpots.js
      recommendationRules.js
    services/
      recommendationService.js

This structure is small but still clean:

app.js sets up Express and routes
server.js starts the server
routes/ contains API endpoints
data/ stores local spot and rule data
services/ contains recommendation logic
2. Express server setup
package.json
{
  "name": "fishwise-backend",
  "version": "1.0.0",
  "description": "Backend for FishWise fishing recommendation app",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
src/app.js
const express = require("express");
const spotsRouter = require("./routes/spots");
const recommendationRouter = require("./routes/recommendation");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "FishWise backend is running."
  });
});

app.use("/api/spots", spotsRouter);
app.use("/api/recommendation", recommendationRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found."
  });
});

module.exports = app;
src/server.js
const app = require("./app");

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`FishWise server is running on http://localhost:${PORT}`);
});
3. GET /api/spots endpoint
src/routes/spots.js
const express = require("express");
const fishingSpots = require("../data/fishingSpots");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(fishingSpots);
});

module.exports = router;

This returns the preset fishing spots from local data.

4. POST /api/recommendation endpoint
src/routes/recommendation.js
const express = require("express");
const {
  validateRecommendationRequest,
  getRecommendation
} = require("../services/recommendationService");

const router = express.Router();

router.post("/", (req, res) => {
  const errors = validateRecommendationRequest(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid request body.",
      errors
    });
  }

  const recommendation = getRecommendation(req.body);
  res.json(recommendation);
});

module.exports = router;
5. Local fishing spot data
src/data/fishingSpots.js
const fishingSpots = [
  {
    id: "westhaven-harbor",
    name: "Westhaven Harbor",
    waterType: "saltwater"
  },
  {
    id: "mission-bay-wharf",
    name: "Mission Bay Wharf",
    waterType: "saltwater"
  },
  {
    id: "lake-riverside",
    name: "Lake Riverside",
    waterType: "freshwater"
  },
  {
    id: "rocky-shore-point",
    name: "Rocky Shore Point",
    waterType: "saltwater"
  },
  {
    id: "river-bend",
    name: "River Bend",
    waterType: "freshwater"
  }
];

module.exports = fishingSpots;

waterType is stored here and derived on the backend from location.

6. Local rule-based recommendation data
src/data/recommendationRules.js
const recommendationRules = [
  {
    location: "mission-bay-wharf",
    waterType: "saltwater",
    timeOfDay: "morning",
    weather: "sunny",
    windLevel: "low",
    targetFish: "snapper",
    recommendedFish: "snapper",
    bait: "pilchard strips",
    lineDepth: "near bottom",
    sinkerWeight: "medium",
    floatType: "none",
    reason:
      "These conditions suggest a simple beginner-friendly bottom-fishing setup."
  },
  {
    location: "mission-bay-wharf",
    waterType: "saltwater",
    timeOfDay: "morning",
    weather: "sunny",
    windLevel: "low",
    targetFish: null,
    recommendedFish: "kahawai",
    bait: "small lure",
    lineDepth: "mid-depth",
    sinkerWeight: "light",
    floatType: "none",
    reason:
      "Calm sunny morning conditions often suit a light and simple setup for kahawai."
  },
  {
    location: "westhaven-harbor",
    waterType: "saltwater",
    timeOfDay: "evening",
    weather: "cloudy",
    windLevel: "medium",
    targetFish: "trevally",
    recommendedFish: "trevally",
    bait: "squid strips",
    lineDepth: "mid-depth",
    sinkerWeight: "medium",
    floatType: "sliding float",
    reason:
      "Cloudy evening harbor conditions can work well for trevally with a mid-depth setup."
  },
  {
    location: "rocky-shore-point",
    waterType: "saltwater",
    timeOfDay: "afternoon",
    weather: "overcast",
    windLevel: "high",
    targetFish: null,
    recommendedFish: "kahawai",
    bait: "metal lure",
    lineDepth: "mid-depth",
    sinkerWeight: "heavy",
    floatType: "none",
    reason:
      "Stronger wind at rocky saltwater spots usually needs a heavier setup for control."
  },
  {
    location: "lake-riverside",
    waterType: "freshwater",
    timeOfDay: "morning",
    weather: "overcast",
    windLevel: "low",
    targetFish: "trout",
    recommendedFish: "trout",
    bait: "worms",
    lineDepth: "shallow",
    sinkerWeight: "light",
    floatType: "standard bobber",
    reason:
      "In calm freshwater conditions, a light shallow setup is simple and suitable for trout."
  },
  {
    location: "lake-riverside",
    waterType: "freshwater",
    timeOfDay: "afternoon",
    weather: "sunny",
    windLevel: "low",
    targetFish: null,
    recommendedFish: "perch",
    bait: "small soft bait",
    lineDepth: "mid-depth",
    sinkerWeight: "light",
    floatType: "standard bobber",
    reason:
      "Sunny freshwater conditions can be beginner-friendly for perch with a simple float setup."
  },
  {
    location: "river-bend",
    waterType: "freshwater",
    timeOfDay: "evening",
    weather: "cloudy",
    windLevel: "medium",
    targetFish: "perch",
    recommendedFish: "perch",
    bait: "worms",
    lineDepth: "mid-depth",
    sinkerWeight: "medium",
    floatType: "standard bobber",
    reason:
      "A steady medium setup around river conditions can work well for perch in the evening."
  }
];

module.exports = recommendationRules;
7. Fallback recommendation logic
src/services/recommendationService.js
const fishingSpots = require("../data/fishingSpots");
const recommendationRules = require("../data/recommendationRules");

const allowedTimeOfDay = ["morning", "afternoon", "evening", "night"];
const allowedWeather = ["sunny", "cloudy", "rainy", "overcast"];
const allowedWindLevel = ["low", "medium", "high"];
const allowedTargetFish = ["snapper", "kahawai", "trevally", "trout", "perch"];

function validateRecommendationRequest(body) {
  const errors = [];

  if (!body.location) {
    errors.push("location is required.");
  }

  if (!body.timeOfDay) {
    errors.push("timeOfDay is required.");
  } else if (!allowedTimeOfDay.includes(body.timeOfDay)) {
    errors.push("timeOfDay is invalid.");
  }

  if (!body.weather) {
    errors.push("weather is required.");
  } else if (!allowedWeather.includes(body.weather)) {
    errors.push("weather is invalid.");
  }

  if (!body.windLevel) {
    errors.push("windLevel is required.");
  } else if (!allowedWindLevel.includes(body.windLevel)) {
    errors.push("windLevel is invalid.");
  }

  if (
    body.targetFish !== undefined &&
    body.targetFish !== null &&
    body.targetFish !== "" &&
    !allowedTargetFish.includes(body.targetFish)
  ) {
    errors.push("targetFish is invalid.");
  }

  const spot = fishingSpots.find((item) => item.id === body.location);
  if (!spot) {
    errors.push("location is invalid.");
  }

  return errors;
}

function getRecommendation(body) {
  const spot = fishingSpots.find((item) => item.id === body.location);
  const waterType = spot.waterType;
  const normalizedTargetFish = body.targetFish ? body.targetFish : null;

  const matchedRule = recommendationRules.find((rule) => {
    return (
      rule.location === body.location &&
      rule.waterType === waterType &&
      rule.timeOfDay === body.timeOfDay &&
      rule.weather === body.weather &&
      rule.windLevel === body.windLevel &&
      rule.targetFish === normalizedTargetFish
    );
  });

  if (matchedRule) {
    return formatRecommendation(matchedRule);
  }

  return buildFallbackRecommendation({
    waterType,
    targetFish: normalizedTargetFish,
    windLevel: body.windLevel
  });
}

function formatRecommendation(rule) {
  return {
    recommendedFish: rule.recommendedFish,
    bait: rule.bait,
    lineDepth: rule.lineDepth,
    sinkerWeight: rule.sinkerWeight,
    floatType: rule.floatType,
    reason: rule.reason
  };
}

function buildFallbackRecommendation({ waterType, targetFish, windLevel }) {
  const fishSetupMap = {
    snapper: {
      recommendedFish: "snapper",
      bait: "pilchard strips",
      lineDepth: "near bottom",
      sinkerWeight: "medium",
      floatType: "none"
    },
    kahawai: {
      recommendedFish: "kahawai",
      bait: "small lure",
      lineDepth: "mid-depth",
      sinkerWeight: "light",
      floatType: "none"
    },
    trevally: {
      recommendedFish: "trevally",
      bait: "squid strips",
      lineDepth: "mid-depth",
      sinkerWeight: "medium",
      floatType: "sliding float"
    },
    trout: {
      recommendedFish: "trout",
      bait: "worms",
      lineDepth: "shallow",
      sinkerWeight: "light",
      floatType: "standard bobber"
    },
    perch: {
      recommendedFish: "perch",
      bait: "worms",
      lineDepth: "shallow",
      sinkerWeight: "light",
      floatType: "standard bobber"
    }
  };

  let fallbackFish = targetFish;

  if (!fallbackFish) {
    fallbackFish = waterType === "saltwater" ? "kahawai" : "trout";
  }

  const baseSetup = fishSetupMap[fallbackFish];

  let sinkerWeight = baseSetup.sinkerWeight;

  if (windLevel === "medium" && sinkerWeight === "light") {
    sinkerWeight = "medium";
  }

  if (windLevel === "high") {
    sinkerWeight = "heavy";
  }

  return {
    recommendedFish: baseSetup.recommendedFish,
    bait: baseSetup.bait,
    lineDepth: baseSetup.lineDepth,
    sinkerWeight,
    floatType: baseSetup.floatType,
    reason:
      "No exact rule matched, so FishWise returned a simple beginner-friendly fallback setup based on the fishing spot and selected conditions."
  };
}

module.exports = {
  validateRecommendationRequest,
  getRecommendation
};

This does three important things:

validates the request body
derives waterType from location
returns a fallback response with the same required fields if no exact rule matches
8. How the endpoints behave
GET /api/spots

Returns:

[
  {
    "id": "westhaven-harbor",
    "name": "Westhaven Harbor",
    "waterType": "saltwater"
  },
  {
    "id": "mission-bay-wharf",
    "name": "Mission Bay Wharf",
    "waterType": "saltwater"
  },
  {
    "id": "lake-riverside",
    "name": "Lake Riverside",
    "waterType": "freshwater"
  },
  {
    "id": "rocky-shore-point",
    "name": "Rocky Shore Point",
    "waterType": "saltwater"
  },
  {
    "id": "river-bend",
    "name": "River Bend",
    "waterType": "freshwater"
  }
]
POST /api/recommendation

Request body:

{
  "location": "mission-bay-wharf",
  "timeOfDay": "morning",
  "weather": "sunny",
  "windLevel": "low",
  "targetFish": "snapper"
}

Response:

{
  "recommendedFish": "snapper",
  "bait": "pilchard strips",
  "lineDepth": "near bottom",
  "sinkerWeight": "medium",
  "floatType": "none",
  "reason": "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}

Fallback example:

{
  "recommendedFish": "kahawai",
  "bait": "small lure",
  "lineDepth": "mid-depth",
  "sinkerWeight": "heavy",
  "floatType": "none",
  "reason": "No exact rule matched, so FishWise returned a simple beginner-friendly fallback setup based on the fishing spot and selected conditions."
}
How to run it

Install packages:

npm install

Run in development mode:

npm run dev

Or start normally:

npm start
Why this is a good MVP backend

This version stays aligned with your project constraints:

no database
no authentication
no external APIs
no machine learning
all data stored locally in JS files

It is also easy to improve later:

add more fishing spots
add more rules
move rules into JSON
add better fallback matching
connect it to your React frontend

The only small design note I would lock now is this: your current requirement says fallback should happen when there is no exact rule match, and this code follows that exactly. It does not try “partial matching” first. That keeps the behavior simple and predictable for a student project.

I can generate the matching React fetch() code for this backend next.