import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [weathers, setWeather] = useState([]);
  const [winds, setWind] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=ogden&appid=a6573011df60d44d409ba0ca008039aa"
      )
      .then((res) => {
        setWeather(res.data.weather);
        setWind(res.data.wind);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <div className="weather-grid">
        <div className="weather-card">
          {weathers.map((weather) => (
            <div className="weather-info">
              <p>Forecast: {weather.description}</p>
              {winds.speed && (
                <div className="weather-info">
                  <p>Wind Speed: {winds.speed} m/s</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
