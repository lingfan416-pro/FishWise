import { useState } from "react";
import "./HomePage.css";

// Dropdown options (easy to change later)
const FISHING_SPOTS = [
  { value: "", label: "Choose a spot…" },
  { value: "lakeview-pier", label: "Lakeview Pier" },
  { value: "riverbend", label: "Riverbend Park" },
  { value: "north-pond", label: "North Pond" },
  { value: "coastal-jetty", label: "Coastal Jetty" },
];

const TIMES_OF_DAY = [
  { value: "", label: "Choose time…" },
  { value: "dawn", label: "Dawn" },
  { value: "morning", label: "Morning" },
  { value: "midday", label: "Midday" },
  { value: "dusk", label: "Dusk" },
  { value: "night", label: "Night" },
];

const WEATHER_OPTIONS = [
  { value: "", label: "Choose weather…" },
  { value: "clear", label: "Clear" },
  { value: "cloudy", label: "Cloudy" },
  { value: "light-rain", label: "Light rain" },
  { value: "windy", label: "Windy (on land)" },
];

const WIND_LEVELS = [
  { value: "", label: "Choose wind…" },
  { value: "calm", label: "Calm" },
  { value: "light", label: "Light" },
  { value: "moderate", label: "Moderate" },
  { value: "strong", label: "Strong" },
];

const TARGET_FISH_OPTIONS = [
  { value: "", label: "No preference (optional)" },
  { value: "bass", label: "Bass" },
  { value: "trout", label: "Trout" },
  { value: "panfish", label: "Panfish" },
  { value: "catfish", label: "Catfish" },
  { value: "saltwater-generic", label: "Saltwater (general)" },
];

// Mock only — later this will call your Express API.
function buildMockRecommendation(spot, time, weather, wind, targetFish) {
  const spotLabel =
    FISHING_SPOTS.find((s) => s.value === spot)?.label ?? "your spot";
  const timeLabel =
    TIMES_OF_DAY.find((t) => t.value === time)?.label?.toLowerCase() ?? time;
  const weatherLabel =
    WEATHER_OPTIONS.find((w) => w.value === weather)?.label?.toLowerCase() ??
    weather;

  let fish = "Largemouth bass";
  if (targetFish === "trout") fish = "Rainbow trout";
  else if (targetFish === "bass") fish = "Largemouth bass";
  else if (targetFish === "panfish") fish = "Bluegill";
  else if (targetFish === "catfish") fish = "Channel catfish";
  else if (targetFish === "saltwater-generic") fish = "Surf perch";
  else if (spot === "coastal-jetty") fish = "Surf perch";

  const bait =
    weather === "light-rain"
      ? "Scented soft plastic or worms"
      : fish.includes("trout")
        ? "Small spinner or salmon egg imitation"
        : fish.includes("perch")
          ? "Sand fleas or small strip bait"
          : "Worm under a bobber";

  let lineDepth = "4–6 feet";
  if (time === "dawn" || time === "dusk") lineDepth = "3–5 feet (shallow feed)";
  if (spot === "coastal-jetty") lineDepth = "Near bottom in troughs";

  let sinker = "1/8–1/4 oz split shot";
  if (wind === "strong" || weather === "windy")
    sinker = "3/8 oz or heavier to hold bottom";

  let floatType = "Medium fixed float";
  if (wind === "strong") floatType = "Smaller, low-profile float";

  const explanation = `At ${spotLabel}, ${timeLabel} with ${weatherLabel} conditions and ${wind} wind, try ${fish.toLowerCase()} with ${bait.toLowerCase()}. This setup is a simple starting point—adjust if fish are deeper or the bite is slow.`;

  return {
    fish,
    bait,
    lineDepth,
    sinker,
    floatType,
    explanation,
  };
}

export default function HomePageCursor() {
  const [spot, setSpot] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [weather, setWeather] = useState("");
  const [wind, setWind] = useState("");
  const [targetFish, setTargetFish] = useState("");

  const [recommendation, setRecommendation] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (!spot || !timeOfDay || !weather || !wind) {
      setRecommendation(null);
      alert("Please fill in fishing spot, time, weather, and wind.");
      return;
    }

    setRecommendation(buildMockRecommendation(spot, timeOfDay, weather, wind, targetFish));
  }

  return (
    <div className="page">
      <header className="header">
        <h1>FishWise</h1>
        <p className="subtitle">
          Simple fishing setup ideas for casual outings—no account needed.
        </p>
      </header>

      <main className="main">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2 className="card-title">Your conditions</h2>

          <label className="field">
            <span>Fishing spot</span>
            <select
              value={spot}
              onChange={(e) => setSpot(e.target.value)}
              aria-label="Preset fishing spot"
            >
              {FISHING_SPOTS.map((opt) => (
                <option key={opt.value || "empty"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Time of day</span>
            <select
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              aria-label="Time of day"
            >
              {TIMES_OF_DAY.map((opt) => (
                <option key={opt.value || "empty"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Weather</span>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              aria-label="Weather"
            >
              {WEATHER_OPTIONS.map((opt) => (
                <option key={opt.value || "empty"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Wind level</span>
            <select
              value={wind}
              onChange={(e) => setWind(e.target.value)}
              aria-label="Wind level"
            >
              {WIND_LEVELS.map((opt) => (
                <option key={opt.value || "empty"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Target fish (optional)</span>
            <select
              value={targetFish}
              onChange={(e) => setTargetFish(e.target.value)}
              aria-label="Target fish optional"
            >
              {TARGET_FISH_OPTIONS.map((opt) => (
                <option key={opt.value || "empty-pref"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="btn-primary">
            Get recommendation
          </button>
        </form>

        {recommendation && (
          <section className="card result-card" aria-live="polite">
            <h2 className="card-title">Your recommendation</h2>
            <dl className="result-grid">
              <div className="result-row">
                <dt>Recommended fish</dt>
                <dd>{recommendation.fish}</dd>
              </div>
              <div className="result-row">
                <dt>Bait</dt>
                <dd>{recommendation.bait}</dd>
              </div>
              <div className="result-row">
                <dt>Line depth</dt>
                <dd>{recommendation.lineDepth}</dd>
              </div>
              <div className="result-row">
                <dt>Sinker weight</dt>
                <dd>{recommendation.sinker}</dd>
              </div>
              <div className="result-row">
                <dt>Float type</dt>
                <dd>{recommendation.floatType}</dd>
              </div>
            </dl>
            <p className="explanation">{recommendation.explanation}</p>
          </section>
        )}
      </main>
    </div>
  );
}
