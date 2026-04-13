I am building the backend for a web app called FishWise using Node.js and Express.

FishWise is a beginner-friendly fishing recommendation app. The React frontend sends the following request body to the backend:

{
  "location": "mission-bay-wharf",
  "timeOfDay": "morning",
  "weather": "sunny",
  "windLevel": "low",
  "targetFish": "snapper"
}

Important backend rules:
- targetFish is optional
- waterType is NOT sent by the frontend
- waterType must be derived from the selected location on the backend

The backend must return this response shape:

{
  "recommendedFish": "snapper",
  "bait": "pilchard strips",
  "lineDepth": "near bottom",
  "sinkerWeight": "medium",
  "floatType": "none",
  "reason": "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}

If no exact rule matches, return a fallback response using the same fields.

Locked values:

Locations:
- westhaven-harbor
- mission-bay-wharf
- lake-riverside
- rocky-shore-point
- river-bend

Time of day:
- morning
- afternoon
- evening
- night

Weather:
- sunny
- cloudy
- rainy
- overcast

Wind level:
- low
- medium
- high

Target fish:
- snapper
- kahawai
- trevally
- trout
- perch

Output categories:
- lineDepth: shallow / mid-depth / near bottom
- sinkerWeight: light / medium / heavy
- floatType: none / standard bobber / sliding float

Please generate:
1. a beginner-friendly backend folder/file structure
2. the Express server setup
3. a GET /api/spots endpoint returning the preset fishing spots
4. a POST /api/recommendation endpoint
5. local fishing spot data
6. local rule-based recommendation data
7. fallback recommendation logic
8. clean and simple code suitable for a student project

Constraints:
- no database
- no authentication
- no external APIs
- no machine learning
- local JS or JSON files only