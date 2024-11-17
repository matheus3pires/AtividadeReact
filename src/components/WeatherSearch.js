import React, { useState } from "react";
import "./WeatherSearch.css";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "ce183357138d987a7a4852a5913c4b39";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );

      if (!response.ok) {
        throw new Error("Não foi possível encontrar os dados para essa cidade.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Busca Meteorológica</h1>
      <input
        type="text"
        value={city}
        placeholder="Digite o nome da cidade"
        onChange={(e) => setCity(e.target.value)}
        className="weather-input"
      />
      <button onClick={fetchWeather} className="weather-button">
        Buscar
      </button>

      {loading && <p>Carregando...</p>}

      {error && <p className="weather-error">{error}</p>}

      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Velocidade do vento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
