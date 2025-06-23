const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 3001;
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

app.use(cors());

app.get('/weather', async (req, res) => {
  const { city, lat, lon } = req.query;
  let url = '';
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));