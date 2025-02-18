import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [weathers, setWeather] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=ogden&appid=a6573011df60d44d409ba0ca008039aa"
      )
      .then((res) => {
        setWeather(res.data.weather);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <div className="weather-grid">
        {weathers.map((weather) => (
          <div className="weather-info">
            <p>Forecast:{weather.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
