const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * /nasa/images:
 *   get:
 *     summary: Search images from NASA Images API
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: The search query to find images
 *     responses:
 *       200:
 *         description: A list of images from NASA Images API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/images', async (req, res) => {
  const query = req.query.q || 'space'; 
  const apiUrl = `https://images-api.nasa.gov/search?q=${query}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const items = response.data.collection.items;
      const images = items.map(item => {
        
        const title = item.data && item.data.length > 0 && item.data[0].title ? item.data[0].title : 'Title not available';
        const description = item.data && item.data.length > 0 && item.data[0].description ? item.data[0].description : 'Description not available';
        const imageUrl = item.links && item.links.length > 0 && item.links[0].href ? item.links[0].href : '';

        return { title, description, imageUrl };
      });

      res.render('nasa-images', { images, query });
    } else {
      console.error('Failed to fetch data from NASA Images API:', response.statusText);
      res.status(response.status).send('Failed to fetch data from NASA Images API');
    }
  } catch (error) {
    console.error('Error fetching NASA Images data:', error);
    res.status(500).send('Error fetching NASA Images data');
  }
});

module.exports = router;
