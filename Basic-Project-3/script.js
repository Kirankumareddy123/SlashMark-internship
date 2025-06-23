const apiKey = 'YOUR_API_KEY';  // Replace with your actual API key

async function getWeather(city) {
  const currentDiv = document.getElementById('current');
  const forecastDiv = document.getElementById('forecast');
  if (!city) city = document.getElementById('city').value.trim();
  if (!city) return;

  currentDiv.innerHTML = '<h2>-- °C</h2><p>Loading...</p>';
  forecastDiv.innerHTML = '';

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    const now = data.list[0];
    currentDiv.innerHTML = `<h2>${Math.round(now.main.temp)} °C</h2><p>${now.weather[0].description}</p>`;

    const daily = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!daily[date]) daily[date] = item;
    });

    Object.entries(daily).slice(0, 7).forEach(([date, day]) => {
      const el = document.createElement('div');
      el.className = 'day-card';
      el.innerHTML = `
        <h4>${new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</h4>
        <p>${Math.round(day.main.temp)}°C</p>
        <p>${day.weather[0].main}</p>
      `;
      forecastDiv.appendChild(el);
    });

  } catch (err) {
    currentDiv.innerHTML = `<h2>-- °C</h2><p>${err.message}</p>`;
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const currentDiv = document.getElementById('current');
      const forecastDiv = document.getElementById('forecast');

      currentDiv.innerHTML = '<h2>-- °C</h2><p>Loading...</p>';
      forecastDiv.innerHTML = '';

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Unable to retrieve location data');
        const data = await res.json();

        const now = data.list[0];
        currentDiv.innerHTML = `<h2>${Math.round(now.main.temp)} °C</h2><p>${now.weather[0].description}</p>`;

        const daily = {};
        data.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0];
          if (!daily[date]) daily[date] = item;
        });

        Object.entries(daily).slice(0, 7).forEach(([date, day]) => {
          const el = document.createElement('div');
          el.className = 'day-card';
          el.innerHTML = `
            <h4>${new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</h4>
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].main}</p>
          `;
          forecastDiv.appendChild(el);
        });

      } catch (err) {
        currentDiv.innerHTML = `<h2>-- °C</h2><p>${err.message}</p>`;
      }
    }, () => {
      alert('Location access denied. Please allow location or enter a city.');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
