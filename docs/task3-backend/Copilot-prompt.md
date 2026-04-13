// FishWise backend MVP
//
// Build a simple Express backend for FishWise.
//
// Frontend request body:
// {
//   location,
//   timeOfDay,
//   weather,
//   windLevel,
//   targetFish (optional)
// }
//
// Important:
// - waterType is NOT sent by the frontend
// - waterType must be derived from the selected location on the backend
//
// Backend response must return:
// - recommendedFish
// - bait
// - lineDepth
// - sinkerWeight
// - floatType
// - reason
//
// Required endpoints:
// - GET /api/spots
// - POST /api/recommendation
//
// Constraints:
// - use local JS/JSON data only
// - no database
// - no authentication
// - no external APIs
// - no machine learning
// - include fallback recommendation logic
// - keep naming consistent with the frontend
//
// Locked enums:
// locations: westhaven-harbor, mission-bay-wharf, lake-riverside, rocky-shore-point, river-bend
// timeOfDay: morning, afternoon, evening, night
// weather: sunny, cloudy, rainy, overcast
// windLevel: low, medium, high
// targetFish: snapper, kahawai, trevally, trout, perch
// lineDepth: shallow, mid-depth, near bottom
// sinkerWeight: light, medium, heavy
// floatType: none, standard bobber, sliding float