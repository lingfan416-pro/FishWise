import { useState } from "react";
import "./App.css";
import FishingForm from "./components/FishingForm";
import RecommendationCard from "./components/RecommendationCard";
import { fishingSpots } from "./data/fishingSpots";
import { mockRecommendation } from "./data/mockRecommendation";

function App() {
  const [formData, setFormData] = useState({
    location: "",
    timeOfDay: "",
    weather: "",
    windLevel: "",
    targetFish: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = () => {
    const { location, timeOfDay, weather, windLevel } = formData;

    if (!location || !timeOfDay || !weather || !windLevel) {
      setError("Please complete all required fields.");
      setRecommendation(null);
      return;
    }

    const selectedSpot = fishingSpots.find((spot) => spot.id === location);

    setRecommendation({
      ...mockRecommendation,
      selectedSpotName: selectedSpot?.name ?? "",
      waterType: selectedSpot?.waterType ?? "",
      targetFish: formData.targetFish || "No preference",
    });

    setError("");
  };

  return (
    <div className="app">
      <div className="container">
        <header className="page-header">
          <h1>FishWise</h1>
          <p className="page-subtitle">
            A beginner-friendly fishing recommendation assistant for simple trip
            planning.
          </p>
        </header>

        <FishingForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />

        {recommendation && <RecommendationCard recommendation={recommendation} />}
      </div>
    </div>
  );
}

export default App;
