/** Used when even the per-fish fallback map cannot pick a setup (rare edge case). */
const fallbackRecommendation = {
  recommendedFish: "kahawai",
  bait: "small lure",
  lineDepth: "mid-depth",
  sinkerWeight: "medium",
  floatType: "standard bobber",
  explanation:
    "No exact rule matched, so FishWise returned a simple beginner-friendly fallback setup."
};

module.exports = fallbackRecommendation;
