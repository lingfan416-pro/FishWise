import { fishingSpots } from "../data/fishingSpots";

const timeOptions = ["morning", "afternoon", "evening", "night"];
const weatherOptions = ["sunny", "cloudy", "rainy", "overcast"];
const windOptions = ["low", "medium", "high"];
const targetFishOptions = ["snapper", "kahawai", "trevally", "trout", "perch"];

function formatLabel(value) {
  if (!value) return "";
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

function FishingForm({ formData, onChange, onSubmit, error }) {
  return (
    <section className="form-section">
      <h2>Fishing Conditions</h2>

      <div className="form-group">
        <label htmlFor="location">Fishing Spot</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={onChange}
        >
          <option value="">Select a fishing spot</option>
          {fishingSpots.map((spot) => (
            <option key={spot.id} value={spot.id}>
              {spot.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="timeOfDay">Time of Day</label>
        <select
          id="timeOfDay"
          name="timeOfDay"
          value={formData.timeOfDay}
          onChange={onChange}
        >
          <option value="">Select time of day</option>
          {timeOptions.map((option) => (
            <option key={option} value={option}>
              {formatLabel(option)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="weather">Weather</label>
        <select
          id="weather"
          name="weather"
          value={formData.weather}
          onChange={onChange}
        >
          <option value="">Select weather</option>
          {weatherOptions.map((option) => (
            <option key={option} value={option}>
              {formatLabel(option)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="windLevel">Wind Level</label>
        <select
          id="windLevel"
          name="windLevel"
          value={formData.windLevel}
          onChange={onChange}
        >
          <option value="">Select wind level</option>
          {windOptions.map((option) => (
            <option key={option} value={option}>
              {formatLabel(option)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="targetFish">Target Fish (Optional)</label>
        <select
          id="targetFish"
          name="targetFish"
          value={formData.targetFish}
          onChange={onChange}
        >
          <option value="">No preference</option>
          {targetFishOptions.map((fish) => (
            <option key={fish} value={fish}>
              {formatLabel(fish)}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="submit-button" type="button" onClick={onSubmit}>
        Get Recommendation
      </button>
    </section>
  );
}

export default FishingForm;
