const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.send('TMDB Proxy Server is running!');
});

// Proxy route for TMDB requests
app.get('/api/tmdb/*', async (req, res) => {
  try {
    // Extract the path after /api/tmdb/
    const path = req.params[0];
    
    // Merge the query parameters and append the API key securely on the backend
    const queryParams = new URLSearchParams({
      ...req.query,
      api_key: API_KEY
    }).toString();

    const tmdbUrl = `${TMDB_BASE_URL}/${path}?${queryParams}`;

    const response = await axios.get(tmdbUrl);
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching from TMDB:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching data from TMDB',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
