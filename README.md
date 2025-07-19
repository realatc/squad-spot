# Squad Spot - A Location-Based Social Planning App

Squad Spot is a web-based social planning application designed to help friends and groups discover and plan meetups at nearby venues. Built with JavaScript, and modern web APIs, Squad Spot simplifies the process of finding the perfect spot for your squad to hang out.

## Features

### User Management
- **User Authentication**: Secure login and signup system with email/password
- **Google OAuth Integration**: Quick login using Google accounts
- **Profile Management**: User profiles with customizable settings

### Squad Management
- **Create Squads**: Form groups of friends for easy planning
- **Squad Organization**: Manage multiple squads with different friend groups
- **Contact Integration**: Import contacts to quickly add friends to squads
- **Squad Actions**: View, edit, and manage squad details

### Hangout Planning
- **Plan Hangouts**: Create hangout events with your squads
- **Voting System**: Let squad members vote on venue preferences
- **Real-time Updates**: See voting results and hangout status
- **Hangout Management**: View active hangouts and past events

### Venue Discovery
- **Location-Based Search**: Find venues near your current location using TomTom and Google APIs
- **Advanced Filtering**: Filter by venue type (food, entertainment, outdoors)
- **Venue Details**: View ratings, descriptions, and location information
- **Search Functionality**: Search for specific venues or types of places
- **Dual API Integration**: Combines TomTom and Google Places for comprehensive venue data

### Activity Tracking
- **Activity Feed**: Track recent activities and hangout history
- **Event Timeline**: View chronological activity of your squads
- **Activity Types**: Different icons for various activity types

### Location Services
- **Geolocation**: Automatic location detection for venue searches
- **Map Integration**: Google Maps integration for venue visualization
- **Distance Calculation**: Find venues within specified radius
- **Location Sharing**: Share your location with squad members
- **Address Geocoding**: Convert addresses to coordinates using Google Geocoding API

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Modern web browser with geolocation support

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/squad-spot.git
   cd squad-spot
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Backend Server**:
   ```bash
   npm start
   ```

4. **Open the Application**:
   - Open `index.html` in your web browser
   - For geolocation testing, open `geolocation.html`

### Development Mode
```bash
npm run dev
```
This starts the server with auto-restart on file changes.

### Browser Testing
1. Open `index.html` in your browser
2. Allow location access when prompted
3. Test venue search functionality
4. Create squads and plan hangouts

## Usage

### Creating Your First Squad
1. Sign up or log in to your account
2. Click the floating "+" button to create a new squad
3. Enter squad name and description
4. Add members using the contact picker or manual entry

### Planning a Hangout
1. Navigate to the "Hangouts" page
2. Click "Plan Hangout" button
3. Select a squad and choose venue preferences
4. Squad members can vote on suggested venues
5. The venue with the most votes becomes the hangout location

### Discovering Venues
1. Go to the "Discover" page
2. Allow location access when prompted
3. Use filters to find specific types of venues
4. Search for particular venues or categories
5. Click on venues to view details and add to hangouts

## Technical Details

### Architecture
- **Frontend**: JavaScript with modular architecture
- **Backend**: Express.js server with RESTful API
- **Data Storage**: LocalStorage for client-side data persistence
- **APIs**: Google Maps API, TomTom API for location services

### API Integration
- **TomTom API**: Primary venue search and location services
- **Google Maps API**: Geocoding and Places search
- **Dual API Strategy**: Combines both services for comprehensive venue data

## Troubleshooting

### General
- App Not Loading or Blank Screen
1. Ensure you are running the backend server (npm start) before opening the app in the browser.
2. Make sure JavaScript is enabled in your browser.
3. Open the browser console (DevTools > Console) to check for errors and follow the messages. 

- Changes Not Reflecting During Development
1. Make sure you are running the app with npm run dev for hot reload support.
2. Try stopping and restarting the server.
3. Clear your browser cache and refresh the page.

### Authentication Issues
- Login Fails with Correct Credentials
1. Ensure the backend server is running and reachable.
2. Check the console for any CORS errors or server-side authentication errors.
3. Try logging in using Google OAuth if email/password isn’t working.

### Geolocation & Maps
- Location Not Detected
1. Make sure your browser supports geolocation and location permissions are granted.
2. Reload the page and allow location access when prompted.
3. On desktop browsers, ensure you're not blocking location sharing.
