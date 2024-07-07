const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * @openapi
 * /weather/{city}:
 *   get:
 *     summary: Get weather information by city name.
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the city to fetch weather information for.
 *     responses:
 *       '200':
 *         description: Weather information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                 temperature:
 *                   type: number
 *                 description:
 *                   type: string
 */
router.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = 'ecdebcc3167d5225afa4683d16d868e8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description
        };
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

module.exports = router;
