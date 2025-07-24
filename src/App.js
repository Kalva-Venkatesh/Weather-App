import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State variables for weather data, loading status, error messages, and city input.
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');

  // IMPORTANT: Replace 'e8e051a279c7c7b7801a635b2924e7bf' with your actual API key from OpenWeatherMap.
  // Get your free API key from https://openweathermap.org/api
  const apiKey = 'e8e051a279c7c7b7801a635b2924e7bf';

  // Function to fetch weather data from OpenWeatherMap API
  const fetchWeatherData = async () => {
    // Clear previous error and set loading to true
    setError('');
    setLoading(true);
    setWeatherData(null); // Clear previous weather data

    // Basic validation for city
    if (!city.trim()) {
      setError('Please enter a city name.');
      setLoading(false);
      return;
    }

    // Check if the API key is still the placeholder (though it's hardcoded now)
    if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
      setError('Please replace "YOUR_OPENWEATHERMAP_API_KEY" in the code with your actual OpenWeatherMap API Key.');
      setLoading(false);
      return;
    }

    try {
      // Construct the API URL. 'units=metric' for Celsius.
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);

      // Check if the response was successful
      if (!response.ok) {
        // Parse error message from API if available
        const errorData = await response.json();
        throw new Error(errorData.message || 'Could not fetch weather data. Please check the city name or API key.');
      }

      // Parse the JSON response
      const data = await response.json();
      setWeatherData(data); // Set the fetched weather data
    } catch (err) {
      // Catch and display any errors during the fetch operation
      setError(err.message);
      console.error('Error fetching weather data:', err);
    } finally {
      // Always set loading to false after the fetch operation completes
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchWeatherData(); // Call the fetch function
  };

  // Render the application UI
  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
          }

          .weather-app-container {
            min-height: 100vh;
            background: linear-gradient(to bottom right, #60a5fa, #9333ea); /* from-blue-400 to-purple-600 */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem; /* p-4 */
            font-family: 'Inter', sans-serif;
          }

          .card {
            background-color: #fff;
            padding: 2rem; /* p-8 */
            border-radius: 1rem; /* rounded-2xl */
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); /* shadow-2xl */
            width: 100%;
            max-width: 28rem; /* max-w-md */
          }

          .title {
            font-size: 2.25rem; /* text-4xl */
            font-weight: 800; /* font-bold */
            text-align: center;
            color: #1f2937; /* text-gray-800 */
            margin-bottom: 1.5rem; /* mb-6 */
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 1rem; /* gap-4 */
            margin-bottom: 1.5rem; /* mb-6 */
          }

          @media (min-width: 640px) { /* sm: */
            .form-group {
              flex-direction: row;
            }
          }

          .input-field {
            flex-grow: 1;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
            appearance: none;
            border: 1px solid #d1d5db; /* border */
            border-radius: 0.75rem; /* rounded-xl */
            padding: 0.75rem 1rem; /* py-3 px-4 */
            color: #374151; /* text-gray-700 */
            line-height: 1.25; /* leading-tight */
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
          }

          .input-field:focus {
            border-color: #3b82f6; /* focus:ring-blue-500 */
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
          }

          .button {
            background-color: #2563eb; /* bg-blue-600 */
            color: #fff;
            font-weight: 700; /* font-bold */
            padding: 0.75rem 1.5rem; /* py-3 px-6 */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
            transition: background-color 0.3s, transform 0.3s ease-in-out, box-shadow 0.3s;
            outline: none;
            border: none;
            cursor: pointer;
          }

          .button:hover {
            background-color: #1d4ed8; /* hover:bg-blue-700 */
            transform: scale(1.05); /* hover:scale-105 */
          }

          .button:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.25); /* focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 */
          }

          .button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .error-message {
            background-color: #fee2e2; /* bg-red-100 */
            border: 1px solid #f87171; /* border-red-400 */
            color: #b91c1c; /* text-red-700 */
            padding: 0.75rem 1rem; /* px-4 py-3 */
            border-radius: 0.75rem; /* rounded-xl */
            position: relative;
            margin-bottom: 1rem; /* mb-4 */
          }

          .error-message strong {
            font-weight: 700; /* font-bold */
          }

          .error-message span {
            margin-left: 0.5rem; /* ml-2 */
          }

          @media (min-width: 640px) { /* sm: */
            .error-message span {
              display: inline;
            }
          }

          .weather-data {
            text-align: center;
            margin-top: 1.5rem; /* mt-6 */
          }

          .city-country {
            font-size: 1.875rem; /* text-3xl */
            font-weight: 600; /* font-semibold */
            color: #1a202c; /* text-gray-900 */
            margin-bottom: 0.5rem; /* mb-2 */
          }

          .temp-display {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem; /* mb-4 */
          }

          .weather-icon {
            width: 5rem; /* w-20 */
            height: 5rem; /* h-20 */
          }

          .temperature {
            font-size: 3.75rem; /* text-6xl */
            font-weight: 800; /* font-extrabold */
            color: #1a202c; /* text-gray-900 */
            margin-left: 0.5rem; /* ml-2 */
          }

          .description {
            font-size: 1.25rem; /* text-xl */
            color: #374151; /* text-gray-700 */
            text-transform: capitalize;
            margin-bottom: 0.5rem; /* mb-2 */
          }

          .details-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr)); /* grid-cols-2 */
            gap: 1rem; /* gap-4 */
            color: #4b5563; /* text-gray-600 */
            font-size: 1.125rem; /* text-lg */
          }

          .details-grid span {
            font-weight: 500; /* font-medium */
          }
        `}
      </style>
      <div className="weather-app-container">
        <div className="card">
          <h1 className="title">Weather-వాతావరణం</h1>

          {/* City Input Form */}
          <form onSubmit={handleSubmit} className="form-group">
            <input
              type="text"
              className="input-field"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="button"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </form>

          {/* Error Message Display */}
          {error && (
            <div className="error-message" role="alert">
              <strong>Error!</strong>
              <span>{error}</span>
            </div>
          )}

          {/* Weather Data Display */}
          {weatherData && (
            <div className="weather-data">
              <h2 className="city-country">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <div className="temp-display">
                {weatherData.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    className="weather-icon"
                  />
                )}
                <p className="temperature">
                  {Math.round(weatherData.main.temp)}°C
                </p>
              </div>
              <p className="description">
                {weatherData.weather[0].description}
              </p>
              <div className="details-grid">
                <p>Humidity: <span>{weatherData.main.humidity}%</span></p>
                <p>Wind Speed: <span>{weatherData.wind.speed} m/s</span></p>
                <p>Feels Like: <span>{Math.round(weatherData.main.feels_like)}°C</span></p>
                <p>Pressure: <span>{weatherData.main.pressure} hPa</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline styles for the main container (optional, but keeping it consistent with React's style prop)
const styles = {
  container: {
    // This outer div is just a wrapper for the entire component,
    // the main styling is applied to .weather-app-container via the style tag.
  },
};

export default App;
