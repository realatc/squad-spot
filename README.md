# Squad Spot - A Social Hangout Planning App

Squad Spot is a web-based social application designed to help friends and groups plan hangouts and activities together. Built with modern web technologies, Squad Spot provides an intuitive interface for creating squads, planning hangouts, discovering venues, and coordinating activities. Whether you're planning a casual meetup or organizing a group outing, Squad Spot makes it easy to bring people together.

## Features

### Squad Management
- **Create Squads**: Form groups with your friends and family for easy coordination
- **Manage Members**: Add and remove squad members as needed
- **Squad Overview**: View all your active squads in one place
- **Squad Details**: See member lists and recent activity for each squad

### Hangout Planning
- **Plan Hangouts**: Create new hangout events with dates, times, and locations
- **Venue Voting**: Let squad members vote on preferred venues for hangouts
- **Activity Tracking**: Keep track of planned activities and past events
- **Real-time Updates**: See changes and votes as they happen

### Venue Discovery
- **Find Restaurants**: Search for restaurants and venues near your location
- **Geolocation**: Use your current location to find nearby places
- **Venue Details**: Get information about venues including ratings and contact info
- **Filter Options**: Search by cuisine type, distance, and other criteria

### Contact Integration
- **Import Contacts**: Import contacts from your device or files
- **Contact Picker**: Select contacts to invite to your squads
- **Invite System**: Send invitations to friends to join your squads
- **Contact Management**: Organize and manage your contact lists

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth navigation
- **Real-time Notifications**: Stay updated with activity in your squads
- **Offline Support**: Progressive Web App features for better performance

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (version 14 or higher) for backend functionality
- API keys for location services (Google Maps, TomTom)

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

3. **Set Up Environment Variables**:
   - Copy `env.template` to `.env`
   - Add your API keys:
     ```bash
     cp env.template .env
     ```
   - Edit `.env` and add your API keys:
     ```
     GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
     TOMTOM_API_KEY=your_tomtom_api_key_here
     PORT=3000
     NODE_ENV=development
     ```

4. **Start the Backend Server**:
   ```bash
   npm start
   ```

5. **Open the Application**:
   - Open `index.html` in your web browser
   - Or serve it using a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

### API Keys Setup

#### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API key)
5. Add the key to your `.env` file

#### TomTom API
1. Go to [TomTom Developer Portal](https://developer.tomtom.com/)
2. Create an account and get a free API key
3. Add the key to your `.env` file

## Project Structure

```
squad-spot/
├── css/                    # Stylesheets
│   ├── base/              # Base styles and variables
│   ├── components/        # Component-specific styles
│   ├── layout/           # Layout styles
│   └── pages/            # Page-specific styles
├── js/                    # JavaScript files
│   ├── backend.js        # Node.js backend server
│   ├── main.js           # Main application logic
│   └── modules/          # Modular JavaScript components
├── index.html            # Main application entry point
├── geolocation.html      # Location-based features
├── package.json          # Node.js dependencies
├── env.template          # Environment variables template
└── README.md            # This file
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **APIs**: Google Maps API, TomTom API
- **Storage**: Local Storage, Browser APIs
- **PWA Features**: Service Workers, Web App Manifest

## Browser Compatibility

Squad Spot works best in modern browsers that support:
- ES6+ JavaScript features
- Geolocation API
- Local Storage
- Fetch API
- Contact Picker API (Chrome on Android/Desktop)

### Known Limitations
- Contact Picker API requires HTTPS in production
- Some features may not work in older browsers
- Geolocation requires user permission

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

### Running in Development Mode
```bash
npm start
```

### Building for Production
The application is currently a static web app that can be deployed to any web server or CDN.

### Testing
Open the application in your browser and test the following features:
- Squad creation and management
- Hangout planning
- Venue search and voting
- Contact import and management
- Geolocation features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the project issues on GitHub
- Review the code comments for implementation details
- Ensure all API keys are properly configured

---

**Squad Spot** - Bringing friends together, one hangout at a time! 🎉