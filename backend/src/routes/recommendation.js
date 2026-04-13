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
      error: "Invalid request body.",
      fields: errors
    });
  }

  const recommendation = getRecommendation(req.body);
  return res.json(recommendation);
});

module.exports = router;
