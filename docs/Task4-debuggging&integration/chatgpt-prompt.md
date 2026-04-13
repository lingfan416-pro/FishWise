I am integrating a React frontend with a Node.js/Express backend for my FishWise project.

The React recommendation card expects this response shape:

{
  "selectedSpotName": "Mission Bay Wharf",
  "waterType": "coastal",
  "targetFish": "snapper",
  "recommendedFish": "snapper",
  "bait": "pilchard strips",
  "lineDepth": "near bottom",
  "sinkerWeight": "medium",
  "floatType": "none",
  "explanation": "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}

But the backend currently returns:

{
  "selectedSpotName": "Mission Bay Wharf",
  "waterType": "coastal",
  "targetFish": "snapper",
  "recommendedFish": "snapper",
  "bait": "pilchard strips",
  "lineDepth": "near bottom",
  "sinkerWeight": "medium",
  "floatType": "none",
  "reason": "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}

As a result, the explanation text does not render correctly in the frontend.

Please:
1. diagnose the issue clearly
2. explain why it happens
3. suggest the best fix
4. say whether the fix should be in the frontend, backend, or both
5. provide corrected code
6. keep the solution simple and suitable for a student project