# Squad Spot Setup Guide

## Environment Variables Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
1. Copy the template file:
   ```bash
   cp env.template .env
   ```

2. Edit `.env` and add your API keys:
   ```bash
   # Google Maps API Key
   GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
   
   # TomTom API Key
   TOMTOM_API_KEY=your_actual_tomtom_api_key_here
   
   # Backend settings
   PORT=3000
   NODE_ENV=development
   ```

### 3. Get API Keys

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the key to your domain for security

#### TomTom API Key
1. Go to [TomTom Developer Portal](https://developer.tomtom.com/)
2. Sign up for a free account
3. Create a new application
4. Get your API key from the dashboard

### 4. Start the Backend Server
```bash
npm start
```

The server will run on `http://localhost:3000`

### 5. Test the Application
1. Open `geolocation.html` in your browser
2. Open `index.html` for the main application
3. Test the restaurant locator functionality

## Security Notes
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- API keys are kept server-side for security
- Frontend makes requests to your backend proxy

## Troubleshooting
- If you get CORS errors, make sure the backend server is running
- If API calls fail, check your API keys and usage limits
- For geolocation issues, ensure you're using HTTPS in production 