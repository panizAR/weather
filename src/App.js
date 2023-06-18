import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Search() {
  let [City, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function submit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let Url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;
    axios.get(Url).then(displayWeather);
  }
  function cityName(event) {
    setCity(event.target.value);
  }
  if (loaded) {
    return (
      <div>
        <div className="center">
          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="search for a city"
              onChange={cityName}
            />
            <input type="submit" value="search" />
          </form>
          <ul>
            <li>Temperature: {Math.round(weather.temperature)}°C</li>
            <li>Description: {weather.description}</li>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind}km/h</li>
            <li>
              <img src={weather.icon} alt={weather.description} />
            </li>
          </ul>
        </div>
        <div className="center">
          <a href="https://github.com/panizAR/weather">
            My GitHub Weather repository Link
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="center">
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="search for a city"
            onChange={cityName}
          />
          <input type="submit" value="search" />
        </form>
        <div className="center">
          <a href="https://github.com/panizAR/weather">
            My GitHub Weather repository Link
          </a>
        </div>
      </div>
    );
  }
}
