import React, { useState } from 'react';

const apiKey = 'YOUR_API_KEY'; // Or use your Node.js backend endpoint

function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    setError('');
    setCurrent(null);
    setForecast([]);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setCurrent(data.list[0]);
      const daily = {};
      data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!daily[date]) daily[date] = item;
      });
      setForecast(Object.entries(daily).slice(0, 7));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <header>
        <h1>Weather Dashboard</h1>
        <p>Live Weather Forecast for Your City</p>
      </header>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>
      <div className="current-weather">
        {error ? (
          <p>{error}</p>
        ) : current ? (
          <>
            <h2>{Math.round(current.main.temp)} °C</h2>
            <p>{current.weather[0].description}</p>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
      <div className="daily-forecast">
        {forecast.map(([date, day]) => (
          <div className="day-card" key={date}>
            <h4>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</h4>
            <p>{Math.round(day.main.temp)}°C</p>
            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDashboard;