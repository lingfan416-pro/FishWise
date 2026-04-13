const recommendationRules = [
  {
    location: "mission-bay-wharf",
    waterType: "coastal",
    timeOfDay: "morning",
    weather: "sunny",
    windLevel: "low",
    targetFish: "snapper",
    recommendedFish: "snapper",
    bait: "pilchard strips",
    lineDepth: "near bottom",
    sinkerWeight: "medium",
    floatType: "none",
    explanation:
      "These conditions suggest a simple beginner-friendly bottom-fishing setup for snapper."
  },
  {
    location: "mission-bay-wharf",
    waterType: "coastal",
    timeOfDay: "morning",
    weather: "sunny",
    windLevel: "low",
    targetFish: null,
    recommendedFish: "kahawai",
    bait: "small lure",
    lineDepth: "mid-depth",
    sinkerWeight: "light",
    floatType: "none",
    explanation:
      "Calm sunny wharf conditions often suit a light and simple setup for kahawai."
  },
  {
    location: "westhaven-harbor",
    waterType: "harbor",
    timeOfDay: "evening",
    weather: "cloudy",
    windLevel: "medium",
    targetFish: "trevally",
    recommendedFish: "trevally",
    bait: "squid strips",
    lineDepth: "mid-depth",
    sinkerWeight: "medium",
    floatType: "sliding float",
    explanation:
      "Cloudy evening harbor conditions can work well for trevally with a mid-depth setup."
  },
  {
    location: "rocky-shore-point",
    waterType: "rockyCoast",
    timeOfDay: "afternoon",
    weather: "overcast",
    windLevel: "high",
    targetFish: null,
    recommendedFish: "kahawai",
    bait: "metal lure",
    lineDepth: "mid-depth",
    sinkerWeight: "heavy",
    floatType: "none",
    explanation:
      "Stronger wind at rocky coastal spots usually needs a heavier setup for control."
  },
  {
    location: "lake-riverside",
    waterType: "lake",
    timeOfDay: "morning",
    weather: "overcast",
    windLevel: "low",
    targetFish: "trout",
    recommendedFish: "trout",
    bait: "worms",
    lineDepth: "shallow",
    sinkerWeight: "light",
    floatType: "standard bobber",
    explanation:
      "In calm freshwater lake conditions, a light shallow setup is simple and suitable for trout."
  },
  {
    location: "lake-riverside",
    waterType: "lake",
    timeOfDay: "afternoon",
    weather: "sunny",
    windLevel: "low",
    targetFish: null,
    recommendedFish: "perch",
    bait: "small soft bait",
    lineDepth: "mid-depth",
    sinkerWeight: "light",
    floatType: "standard bobber",
    explanation:
      "Sunny freshwater lake conditions can be beginner-friendly for perch with a simple float setup."
  },
  {
    location: "river-bend",
    waterType: "river",
    timeOfDay: "evening",
    weather: "cloudy",
    windLevel: "medium",
    targetFish: "perch",
    recommendedFish: "perch",
    bait: "worms",
    lineDepth: "mid-depth",
    sinkerWeight: "medium",
    floatType: "standard bobber",
    explanation:
      "A steady medium setup in river conditions can work well for perch in the evening."
  },
  {
    location: "river-bend",
    waterType: "river",
    timeOfDay: "morning",
    weather: "rainy",
    windLevel: "low",
    targetFish: "trout",
    recommendedFish: "trout",
    bait: "worms",
    lineDepth: "shallow",
    sinkerWeight: "light",
    floatType: "standard bobber",
    explanation:
      "Light rain and calm river conditions can still suit a simple shallow trout setup."
  }
];

module.exports = recommendationRules;
