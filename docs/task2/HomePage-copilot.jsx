import React, { useState } from 'react';
import './HomePage.css';

// Mock recommendation engine
const mockRecommendations = {
  'lake-morning-clear-calm': {
    fish: 'Largemouth Bass',
    bait: 'Live minnow',
    depth: '8-12 feet',
    sinker: 'Light',
    float: 'Bobber',
    explanation: 'Bass are most active in early morning. Clear water and calm conditions make bobber fishing ideal.'
  },
  'lake-dusk-cloudy-light': {
    fish: 'Catfish',
    bait: 'Chicken liver',
    depth: '15-20 feet',
    sinker: 'Medium',
    float: 'None',
    explanation: 'Catfish feed actively at dusk in cloudy weather. Bottom fishing works best for bottom feeders.'
  },
  'river-midday-clear-moderate': {
    fish: 'Trout',
    bait: 'Worm or artificial lure',
    depth: '3-6 feet',
    sinker: 'Light',
    float: 'None',
    explanation: 'Trout prefer cooler, moving water. Moderate wind helps by oxygenating the water.'
  },
  'ocean-morning-clear-strong': {
    fish: 'Striped Bass',
    bait: 'Live mullet',
    depth: '10-15 feet',
    sinker: 'Heavy',
    float: 'None',
    explanation: 'Striped bass hunt in morning light. Strong wind churns baitfish, increasing feeding activity.'
  },
  'default': {
    fish: 'Bluegill',
    bait: 'Cricket or small worm',
    depth: '4-8 feet',
    sinker: 'Very light',
    float: 'Bobber',
    explanation: 'Bluegill are beginner-friendly and responsive to simple bobber rigs in most conditions.'
  }
};

const LOCATIONS = ['Lake Michigan', 'Local Pond', 'River Valley', 'Coastal Pier'];
const WATER_TYPES = ['Lake', 'River', 'Ocean', 'Pond'];
const TIMES_OF_DAY = ['Dawn', 'Morning', 'Midday', 'Dusk', 'Night'];
const WEATHER_OPTIONS = ['Clear', 'Cloudy', 'Rainy', 'Sunny'];
const WIND_LEVELS = ['Calm', 'Light', 'Moderate', 'Strong'];

export default function HomePage() {
  const [location, setLocation] = useState('');
  const [waterType, setWaterType] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [weather, setWeather] = useState('');
  const [windLevel, setWindLevel] = useState('');
  const [targetFish, setTargetFish] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const getRecommendation = () => {
    const key = `${waterType}-${timeOfDay}-${weather}-${windLevel}`.toLowerCase().replace(/\s+/g, '-');
    const rec = mockRecommendations[key] || mockRecommendations.default;
    setRecommendation(rec);
    setSubmitted(true);
  };

  const handleReset = () => {
    setLocation('');
    setWaterType('');
    setTimeOfDay('');
    setWeather('');
    setWindLevel('');
    setTargetFish('');
    setRecommendation(null);
    setSubmitted(false);
  };

  const isFormValid = location && waterType && timeOfDay && weather && windLevel;

  return (
    <div className="home-page">
      <header className="header">
        <h1>🎣 FishWise</h1>
        <p className="subtitle">Get personalized fishing recommendations for your conditions</p>
      </header>

      <main className="main-content">
        <div className="form-section">
          <form className="form-container">
            <div className="form-group">
              <label htmlFor="location">Fishing Location *</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">-- Select a location --</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="waterType">Water Type *</label>
              <select
                id="waterType"
                value={waterType}
                onChange={(e) => setWaterType(e.target.value)}
              >
                <option value="">-- Select water type --</option>
                {WATER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timeOfDay">Time of Day *</label>
              <select
                id="timeOfDay"
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
              >
                <option value="">-- Select time --</option>
                {TIMES_OF_DAY.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="weather">Weather *</label>
              <select
                id="weather"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
              >
                <option value="">-- Select weather --</option>
                {WEATHER_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="windLevel">Wind Level *</label>
              <select
                id="windLevel"
                value={windLevel}
                onChange={(e) => setWindLevel(e.target.value)}
              >
                <option value="">-- Select wind level --</option>
                {WIND_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="targetFish">Target Fish (Optional)</label>
              <input
                id="targetFish"
                type="text"
                placeholder="e.g., Bass, Catfish"
                value={targetFish}
                onChange={(e) => setTargetFish(e.target.value)}
              />
            </div>

            <div className="button-group">
              <button
                type="button"
                onClick={getRecommendation}
                disabled={!isFormValid}
                className="btn-primary"
              >
                Get Recommendation
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {submitted && recommendation && (
          <div className="recommendation-section">
            <div className="recommendation-card">
              <h2>Your Fishing Recommendation</h2>
              
              <div className="rec-grid">
                <div className="rec-item">
                  <span className="rec-label">Fish Species</span>
                  <span className="rec-value">{recommendation.fish}</span>
                </div>
                <div className="rec-item">
                  <span className="rec-label">Bait</span>
                  <span className="rec-value">{recommendation.bait}</span>
                </div>
                <div className="rec-item">
                  <span className="rec-label">Line Depth</span>
                  <span className="rec-value">{recommendation.depth}</span>
                </div>
                <div className="rec-item">
                  <span className="rec-label">Sinker Weight</span>
                  <span className="rec-value">{recommendation.sinker}</span>
                </div>
                <div className="rec-item">
                  <span className="rec-label">Float Type</span>
                  <span className="rec-value">{recommendation.float}</span>
                </div>
              </div>

              <div className="rec-explanation">
                <p><strong>Why this works:</strong> {recommendation.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}