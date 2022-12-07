import React, { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target[0].value);
  };

  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: "GET",
        url: "https://yahoo-weather5.p.rapidapi.com/weather",
        params: { location: city, format: "json", u: "c" },
        headers: {
          "X-RapidAPI-Key":
            "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
          "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);
      setWeather(response.data);
    };
    fetchWeather();
  }, [city]);

  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" />
        <input type="submit" />
      </form>
      <div className="display">
        {weather && (
          <h2 className="city">
            {weather.location.city}, {weather.location.country}
          </h2>
        )}
        <div className="infos">
          {weather && (
            <h3 className="condition">
              {weather.current_observation.condition.text}
            </h3>
          )}
          {weather && (
            <p className="temperature">
              🌡 Temperature :{" "}
              {weather.current_observation.condition.temperature}°c
            </p>
          )}
          {weather && (
            <p className="sunrise">
              ☀ Sunrise : {weather.current_observation.astronomy.sunrise}
            </p>
          )}
          {weather && (
            <p className="humidity">
              💧 Humidity : {weather.current_observation.atmosphere.humidity}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
