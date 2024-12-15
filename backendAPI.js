      const express = require('express');
      const axios = require('axios');
      const app = express();
      const port = process.env.PORT || 3000;
      
      // OpenWeatherMap API key (sign up at https://openweathermap.org/api)
      const API_KEY = 'your_openweathermap_api_key';
      const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
      
      app.use(express.json());
      
      // Route to get weather data
      app.get('/weather', async (req, res) => {
        const city = req.query.city;
        if (!city) {
          return res.status(400).json({ error: 'City name is required' });
        }
      
        try {
          const response = await axios.get(BASE_URL, {
            params: {
              q: city,
              appid: API_KEY,
              units: 'metric'  // Use 'imperial' for Fahrenheit
            }
          });
      
          const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            country: response.data.sys.country,
          };
      
          res.json(weatherData);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch weather data' });
        }
      });
      
      // Default route
      app.get('/', (req, res) => {
        res.send('Weather App API is working');
      });
      
      // Start the server
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
