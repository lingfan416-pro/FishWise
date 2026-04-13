import { useState } from "react";
import "./App.css";
import FishingForm from "./components/FishingForm";
import RecommendationCard from "./components/RecommendationCard";

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

  const handleSubmit = async () => {
    const { location, timeOfDay, weather, windLevel } = formData;

    if (!location || !timeOfDay || !weather || !windLevel) {
      setError("Please complete all required fields.");
      setRecommendation(null);
      return;
    }

    setError("");

    try {
      const res = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: formData.location,
          timeOfDay: formData.timeOfDay,
          weather: formData.weather,
          windLevel: formData.windLevel,
          targetFish: formData.targetFish,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRecommendation(null);
        setError(
          data.error ??
            "The server could not process your request. Check your selections."
        );
        return;
      }

      setRecommendation(data);
    } catch {
      setRecommendation(null);
      setError(
        "Could not reach the FishWise server. Start the backend (npm run dev in /backend) and try again."
      );
    }
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
