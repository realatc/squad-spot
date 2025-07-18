import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const TOMTOM_API_KEY = process.env.TOMTOM_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Function to calculate the centroid (average location) of multiple lat/lng points
function calculateCentroid(locations) {
  let latSum = 0;
  let lngSum = 0;
  locations.forEach(({ lat, lng }) => {
    latSum += lat;
    lngSum += lng;
  });
  return { lat: latSum / locations.length, lng: lngSum / locations.length };
}

// TomTom API endpoint for POI search
app.post('/search', async (req, res) => {
  try {
    // Extract query and locations from the request body
    const { query, locations } = req.body;

    // Validate input
    if (!query || !locations || !Array.isArray(locations) || locations.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid query or locations' });
    }

    // Calculate the centroid of user locations (average location)
    const centroid = calculateCentroid(locations);

    // TomTom API endpoint for POI search based on query and radius
    const url = `https://api.tomtom.com/search/2/poiSearch/${encodeURIComponent(query)}.json?lat=${centroid.lat}&lon=${centroid.lng}&radius=10000&limit=10&key=${TOMTOM_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: `TomTom API error: ${text}` });
    }

    const data = await response.json();

    // Return the centroid and the list of places found from TomTom API
    res.json({ centroid, results: data.results || [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Google Maps API proxy endpoints
app.post('/api/geocode', async (req, res) => {
  try {
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/places', async (req, res) => {
  try {
    const { lat, lng, radius = 3000, type = 'restaurant' } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});