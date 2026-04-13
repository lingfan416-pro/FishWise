const fishingSpots = [
  {
    id: "westhaven-harbor",
    name: "Westhaven Harbor",
    waterType: "harbor",
    commonFish: ["snapper", "kahawai"],
    description:
      "A calm harbor-style saltwater spot suitable for beginner-friendly fishing."
  },
  {
    id: "mission-bay-wharf",
    name: "Mission Bay Wharf",
    waterType: "coastal",
    commonFish: ["kahawai", "trevally", "snapper"],
    description:
      "An accessible coastal wharf location with mixed beginner saltwater conditions."
  },
  {
    id: "lake-riverside",
    name: "Lake Riverside",
    waterType: "lake",
    commonFish: ["trout", "perch"],
    description:
      "A still freshwater location where beginners can try float or mid-depth fishing."
  },
  {
    id: "rocky-shore-point",
    name: "Rocky Shore Point",
    waterType: "rockyCoast",
    commonFish: ["snapper", "kahawai"],
    description:
      "A more exposed rocky coastal spot where wind and bottom fishing matter."
  },
  {
    id: "river-bend",
    name: "River Bend",
    waterType: "river",
    commonFish: ["perch", "trout"],
    description:
      "A simple freshwater river spot suitable for light tackle and float fishing."
  }
];

module.exports = fishingSpots;
