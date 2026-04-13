const fishingSpots = require("../data/fishingSpots");
const recommendationRules = require("../data/recommendationRules");
const fallbackRecommendation = require("../data/fallbackRecommendation");

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

function findSpotById(locationId) {
  return fishingSpots.find((spot) => spot.id === locationId) || null;
}

function getRecommendation(body) {
  const spot = findSpotById(body.location);
  const waterType = spot.waterType;
  const normalizedTargetFish = body.targetFish ? body.targetFish : null;

  const exactRule = recommendationRules.find((rule) => {
    return (
      rule.location === body.location &&
      rule.waterType === waterType &&
      rule.timeOfDay === body.timeOfDay &&
      rule.weather === body.weather &&
      rule.windLevel === body.windLevel &&
      rule.targetFish === normalizedTargetFish
    );
  });

  if (exactRule) {
    return buildApiRecommendation({
      spot,
      targetFish: normalizedTargetFish,
      recommendation: exactRule,
      usedFallback: false
    });
  }

  const fallback = buildFallbackRecommendation({
    spot,
    targetFish: normalizedTargetFish,
    windLevel: body.windLevel
  });

  return fallback;
}

function buildApiRecommendation({ spot, targetFish, recommendation, usedFallback }) {
  return {
    selectedSpotName: spot.name,
    waterType: spot.waterType,
    targetFish: targetFish || "No preference",
    recommendedFish: recommendation.recommendedFish,
    bait: recommendation.bait,
    lineDepth: recommendation.lineDepth,
    sinkerWeight: recommendation.sinkerWeight,
    floatType: recommendation.floatType,
    explanation: recommendation.explanation,
    reason: recommendation.explanation,
    usedFallback
  };
}

function buildFallbackRecommendation({ spot, targetFish, windLevel }) {
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
    if (["harbor", "coastal", "rockyCoast"].includes(spot.waterType)) {
      fallbackFish = "kahawai";
    } else {
      fallbackFish = "trout";
    }
  }

  const baseSetup = fishSetupMap[fallbackFish] || fallbackRecommendation;

  let sinkerWeight = baseSetup.sinkerWeight;
  if (windLevel === "medium" && sinkerWeight === "light") {
    sinkerWeight = "medium";
  }
  if (windLevel === "high") {
    sinkerWeight = "heavy";
  }

  return {
    selectedSpotName: spot.name,
    waterType: spot.waterType,
    targetFish: targetFish || "No preference",
    recommendedFish: baseSetup.recommendedFish,
    bait: baseSetup.bait,
    lineDepth: baseSetup.lineDepth,
    sinkerWeight,
    floatType: baseSetup.floatType,
    explanation: fallbackRecommendation.explanation,
    reason: fallbackRecommendation.reason,
    usedFallback: true
  };
}

module.exports = {
  validateRecommendationRequest,
  getRecommendation,
  findSpotById
};
