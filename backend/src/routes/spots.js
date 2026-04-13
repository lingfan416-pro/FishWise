const express = require("express");
const fishingSpots = require("../data/fishingSpots");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(fishingSpots);
});

module.exports = router;
