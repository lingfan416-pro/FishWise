function formatWaterType(value) {
  const labels = {
    harbor: "Harbor",
    coastal: "Coastal",
    lake: "Lake",
    rockyCoast: "Rocky Coast",
    river: "River",
  };

  return labels[value] || value;
}

function RecommendationCard({ recommendation }) {
  return (
    <section className="result-section" aria-live="polite">
      <h2>Recommendation Result</h2>

      <div className="result-card">
        <p>
          <strong>Selected Spot:</strong> {recommendation.selectedSpotName}
        </p>
        <p>
          <strong>Water Type:</strong> {formatWaterType(recommendation.waterType)}
        </p>
        <p>
          <strong>Target Fish:</strong> {recommendation.targetFish}
        </p>
        <hr />
        <p>
          <strong>Recommended Fish:</strong> {recommendation.recommendedFish}
        </p>
        <p>
          <strong>Bait:</strong> {recommendation.bait}
        </p>
        <p>
          <strong>Line Depth:</strong> {recommendation.lineDepth}
        </p>
        <p>
          <strong>Sinker Weight:</strong> {recommendation.sinkerWeight}
        </p>
        <p>
          <strong>Float Type:</strong> {recommendation.floatType}
        </p>
        <p>
          <strong>Explanation:</strong> {recommendation.explanation}
        </p>
      </div>
    </section>
  );
}

export default RecommendationCard;
