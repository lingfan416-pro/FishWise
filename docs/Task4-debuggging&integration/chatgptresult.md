Yes — the issue is a field name mismatch.

1. Diagnosis

Your React card expects this property:

"explanation": "..."

But your backend sends:

"reason": "..."

So the frontend looks for recommendation.explanation, but that field does not exist in the response.

2. Why it happens

React only renders the data that actually exists on the object it receives.

For example, if your card does this:

<p>{recommendation.explanation}</p>

but the backend returns:

{
  "reason": "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}

then recommendation.explanation is undefined.

That is why the explanation text does not appear correctly.

3. Best fix

The best fix is to make the backend return explanation instead of reason.

That is better because:

the frontend already expects explanation
explanation is clearer for UI display
the API response and frontend contract stay consistent
4. Where should the fix be made?

For a student project, the main fix should be in the backend.

You can also add a small frontend fallback if you want extra safety, but the cleanest solution is:

Backend: rename reason to explanation
Frontend: keep using recommendation.explanation

So the short answer is: backend first, optionally both

5. Corrected code
Backend: change reason to explanation

If your backend currently has something like this:

function formatRecommendation(rule) {
  return {
    selectedSpotName: rule.selectedSpotName,
    waterType: rule.waterType,
    targetFish: rule.targetFish,
    recommendedFish: rule.recommendedFish,
    bait: rule.bait,
    lineDepth: rule.lineDepth,
    sinkerWeight: rule.sinkerWeight,
    floatType: rule.floatType,
    reason: rule.reason
  };
}

change it to:

function formatRecommendation(rule) {
  return {
    selectedSpotName: rule.selectedSpotName,
    waterType: rule.waterType,
    targetFish: rule.targetFish,
    recommendedFish: rule.recommendedFish,
    bait: rule.bait,
    lineDepth: rule.lineDepth,
    sinkerWeight: rule.sinkerWeight,
    floatType: rule.floatType,
    explanation: rule.explanation
  };
}
Backend rule data: use explanation

If your rule data currently looks like this:

{
  selectedSpotName: "Mission Bay Wharf",
  waterType: "coastal",
  targetFish: "snapper",
  recommendedFish: "snapper",
  bait: "pilchard strips",
  lineDepth: "near bottom",
  sinkerWeight: "medium",
  floatType: "none",
  reason: "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}

change it to:

{
  selectedSpotName: "Mission Bay Wharf",
  waterType: "coastal",
  targetFish: "snapper",
  recommendedFish: "snapper",
  bait: "pilchard strips",
  lineDepth: "near bottom",
  sinkerWeight: "medium",
  floatType: "none",
  explanation: "These conditions suggest a simple beginner-friendly bottom-fishing setup."
}
Backend fallback response: also use explanation

If you have fallback logic like this:

return {
  selectedSpotName,
  waterType,
  targetFish,
  recommendedFish: "kahawai",
  bait: "small lure",
  lineDepth: "mid-depth",
  sinkerWeight: "medium",
  floatType: "none",
  reason: "No exact rule matched, so a simple beginner-friendly setup was returned."
};

change it to:

return {
  selectedSpotName,
  waterType,
  targetFish,
  recommendedFish: "kahawai",
  bait: "small lure",
  lineDepth: "mid-depth",
  sinkerWeight: "medium",
  floatType: "none",
  explanation: "No exact rule matched, so a simple beginner-friendly setup was returned."
};
Frontend: recommendation card

Your React card should use explanation:

function RecommendationCard({ recommendation }) {
  return (
    <div className="recommendation-card">
      <h2>Recommendation</h2>
      <p><strong>Spot:</strong> {recommendation.selectedSpotName}</p>
      <p><strong>Water Type:</strong> {recommendation.waterType}</p>
      <p><strong>Target Fish:</strong> {recommendation.targetFish || "No preference"}</p>
      <p><strong>Recommended Fish:</strong> {recommendation.recommendedFish}</p>
      <p><strong>Bait:</strong> {recommendation.bait}</p>
      <p><strong>Line Depth:</strong> {recommendation.lineDepth}</p>
      <p><strong>Sinker Weight:</strong> {recommendation.sinkerWeight}</p>
      <p><strong>Float Type:</strong> {recommendation.floatType}</p>
      <p><strong>Explanation:</strong> {recommendation.explanation}</p>
    </div>
  );
}

export default RecommendationCard;
6. Optional safe frontend fallback

If you want the frontend to work even before all backend code is updated, you can temporarily do this:

<p>
  <strong>Explanation:</strong> {recommendation.explanation || recommendation.reason}
</p>

This is useful during integration, but for the final version I would still standardize everything to explanation.

Recommended final choice

For your project, I would use this rule:

API response field = explanation
React card field = explanation
remove reason from backend responses

That is the simplest and cleanest fix.

Here is the final correct response shape:

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

I can also help you refactor your existing backend file line by line if you paste it here.