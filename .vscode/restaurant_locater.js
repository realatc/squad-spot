const API_KEY = 'AIzaSyBHdCV-vtenMQWl3qr8qxw7jam3a0zIuBY'; // replace with your key

async function findRestaurants() {
  const locationInput = document.getElementById('locationInput').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Searching...';

  try {

    const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&key=${API_KEY}`;
    const geoResp = await fetch(geoURL);
    const geoData = await geoResp.json();

    console.log('Geocoding Response:', geoData); // 👈 helps debug

    if (geoData.status !== 'OK' || !geoData.results.length) {
      resultsDiv.innerHTML = 'Location not found.';
      return;
    }

    const { lat, lng } = geoData.results[0].geometry.location;

    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: { lat, lng },
      radius: 3000,
      type: 'restaurant'
    };

    service.nearbySearch(request, (places, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !places.length) {
        resultsDiv.innerHTML = 'No restaurants found.';
        return;
      }

  
      resultsDiv.innerHTML = '';
      places.slice(0, 10).forEach(place => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `
          <strong>${place.name}</strong><br>
          ${place.vicinity}<br>
          ⭐ Rating: ${place.rating || 'N/A'}<br>
          💵 Price Level: ${'💲'.repeat(place.price_level || 0)}
        `;
        resultsDiv.appendChild(div);
      });
    });

  } catch (err) {
    console.error('Error:', err);
    resultsDiv.innerHTML = 'Something went wrong. Check console.';
  }
}

