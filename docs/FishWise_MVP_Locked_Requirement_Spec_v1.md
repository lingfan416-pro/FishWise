# FishWise MVP — Locked Requirement Spec v1

## 1. Project overview
**FishWise** is a beginner-friendly web application that provides simple, rule-based fishing recommendations for casual users. A user selects a preset fishing location, enters a small set of fishing conditions, and receives one main recommended setup including fish type, bait, line depth, sinker weight, float type, and a short explanation. The MVP is intentionally simple, stateless, and anonymous, with no login, no database, and no live weather or tide integrations.

## 2. Target users
Primary users:
- casual fishers
- beginner anglers
- family users who want simple setup advice rather than expert-level analysis

## 3. MVP goal
The MVP should answer this question clearly:

**Given a beginner’s selected fishing spot and conditions, what basic fishing setup should they try?**

## 4. Locked scope decisions

### 4.1 Location
For MVP, **location means a preset named fishing spot from a fixed list**.
There will be **no interactive free map selection in version 1**. This reduces ambiguity and keeps the scope controlled.

### 4.2 Water type
**Water type will be auto-derived from the selected location**, not entered separately by the user.
Reason: this avoids invalid combinations such as freshwater lake + saltwater input.

### 4.3 Time of day
Use fixed categories:
- morning
- afternoon
- evening
- night

### 4.4 Weather
Use fixed categories:
- sunny
- cloudy
- rainy
- overcast

### 4.5 Wind level
Use fixed categories:
- low
- medium
- high

### 4.6 Target fish
**Target fish is optional** and will use a **dropdown**, not free text.
Rule:
- if target fish is blank, the app recommends a likely fish for the selected conditions
- if target fish is chosen, the app adjusts the recommendation toward that fish where possible

### 4.7 Recommended fish
The system returns **one main recommended fish**, not a ranked list. This keeps the result simple and beginner-friendly.

### 4.8 Bait
The system returns **one main bait recommendation** or a very small beginner-friendly option set, such as “squid or pilchard,” not a large list.

### 4.9 Line depth
For MVP, **line depth means bait depth in the water**, not casting distance.
Use fixed categories:
- shallow
- mid-depth
- near bottom

### 4.10 Sinker weight
Use simple categories:
- light
- medium
- heavy

No exact grams or ounces in version 1.

### 4.11 Float type
Use a small fixed set:
- none
- standard bobber
- sliding float

### 4.12 Explanation
Return **1–3 short sentences** in plain language explaining why the recommendation fits the selected conditions.

### 4.13 Recommendation logic
Recommendations will be **rule-based only**, implemented using local JSON or JS data.
No machine learning, no predictive models, and no external fish-behavior services.

### 4.14 Fallback behavior
If no exact rule matches, the system should return **one beginner-friendly fallback recommendation** instead of a hard error.

## 5. Functional requirements

### FR1. Spot selection
The user can select a preset fishing location from a dropdown list.

### FR2. Condition input
The user can select:
- time of day
- weather
- wind level
- optional target fish

### FR3. Recommendation request
The user can submit the selected inputs to the backend.

### FR4. Recommendation generation
The backend can evaluate the request against a rule set and generate a fishing recommendation.

### FR5. Recommendation display
The frontend can display:
- recommended fish
- bait
- line depth
- sinker weight
- float type
- explanation

### FR6. Validation
The system can validate required fields before generating a recommendation.

### FR7. Fallback response
If no exact rule is matched, the system can return a safe fallback recommendation instead of failing.

## 6. Non-functional requirements

- The app must be simple and beginner-friendly.
- The app must not require user login.
- The app must not use live weather or tide APIs.
- The app must not require a database in version 1.
- The UI should be usable on desktop and mobile-sized screens.
- Inputs must be validated on both frontend and backend.
- Recommendation results should return quickly using local rule logic.

## 7. Core input fields

| Field | Type | Required | Notes |
|---|---|---:|---|
| location | dropdown | yes | preset named fishing spot |
| timeOfDay | dropdown | yes | morning / afternoon / evening / night |
| weather | dropdown | yes | sunny / cloudy / rainy / overcast |
| windLevel | dropdown | yes | low / medium / high |
| targetFish | dropdown | no | optional preferred fish |

Note: **water type is not a user input in v1**. It comes from the selected spot.

## 8. Core output fields

| Field | Type | Notes |
|---|---|---|
| recommendedFish | text | one main fish |
| bait | text | one main bait or small simple option |
| lineDepth | text | shallow / mid-depth / near bottom |
| sinkerWeight | text | light / medium / heavy |
| floatType | text | none / standard bobber / sliding float |
| explanation | short text | 1–3 plain-language sentences |

## 9. Starter dataset decisions

For MVP:
- **5 preset fishing spots**
- **5 fish species**
- **20–30 rule combinations**
- **1 fallback rule**

This is large enough to demonstrate logic, but still manageable for a student project.

## 10. Out-of-scope features

These are explicitly excluded from MVP:
- user accounts and authentication
- saved trips, history, favorites, or server-side persistence
- database integration
- real-time weather APIs
- tide APIs
- fish prediction models or ML
- free map selection
- GPS-based location detection
- social/community features
- payments or gear shopping
- native mobile apps
- advanced analytics pipelines

## 11. User flow

1. User opens FishWise.
2. User selects a preset fishing location.
3. User selects time of day, weather, and wind level.
4. User optionally selects a target fish.
5. User clicks **Get Recommendation**.
6. Frontend sends the request to the Express backend.
7. Backend validates the input and checks the rule set.
8. Backend returns one recommendation object.
9. Frontend displays the recommendation card.
10. If no exact rule matches, the app shows a beginner-friendly fallback suggestion.

## 12. Implementation note
For version 1, the best technical approach is:
- React frontend
- Node.js/Express backend
- one main recommendation endpoint
- local JSON or JS rule tables
- fixed dropdown values only
- no free-text inputs except possibly internal notes later

## 13. Final MVP definition
**FishWise is a rule-based fishing recommendation web app for beginners. Users select a preset fishing location and choose basic fishing conditions from fixed dropdown values. The app sends these inputs to a Node.js/Express backend, which checks a predefined rule set and returns one beginner-friendly recommendation including fish type, bait, line depth, sinker weight, float type, and a short explanation.**
