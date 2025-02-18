import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [weathers, setWeather] = useState([]);
  const [winds, setWind] = useState([]);
  const [tempHums, setTempHum] = useState([]);
  const [error, setError] = useState("");
  const [city, setCity] = useState("ogden"); // State for user input (default to "Ogden")
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Store timeout ID for clearing debounce

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);

    // Clear previous timeout to reset delay
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to fetch weather after a delay (e.g., 500ms)
    const timeout = setTimeout(() => {
      fetchWeather(newCity); // Fetch weather after the delay
    }, 500);

    setDebounceTimeout(timeout); // Store the timeout ID to clear it if needed
  };

  const fetchWeather = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a6573011df60d44d409ba0ca008039aa`
      )
      .then((res) => {
        setWeather(res.data.weather); // Set weather data
        setWind(res.data.wind); // Set wind data
        setTempHum(res.data.main); // Set temperature and humidity data
        setError(""); // Reset error if successful
      })
      .catch((err) => {
        setError("City not found. Please try again.");
      });
  };

  // Fetch weather initially for the default city
  useEffect(() => {
    fetchWeather(city);
  }, [city]); // Re-run the effect when city changes

  return (
    <div className="container">
      {/* Input field for city */}
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleCityChange} // Update city as the user types
      />

      {/* Display error if any */}
      {error && <p>{error}</p>}

      <div className="weather-grid">
        <div className="weather-card">
          {/* Display weather, wind, and tempHum */}
          {weathers.map((weather, index) => (
            <div key={index} className="weather-info">
              <p>Forecast: {weather.description}</p>
              <p>Wind Speed: {winds.speed} m/s</p>
              <p>Temperature: {tempHums.temp} °K</p>
              <p>Humidity: {tempHums.humidity} %</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
