# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


GOOGLE_MAPS_API_KEY = AIzaSyDcwH-TMECTMZ4XqXwIUGg73jaLdU1vu2M

3. Architecture Overview

   Frontend: The app is developed using React Native with Expo for easy cross-platform deployment. It incorporates navigation for seamless user experience.

   Backend: The Golang server handles JWT authentication, location data storage, and exposes endpoints for fetching data. Locations are fetched from the /locations endpoint.

   Google Maps Integration: Google Maps API is used to display the markers on the map. Markers are generated based on the location data retrieved from the server

4. Implementation Decisions

   JWT Authentication: Chose JWT for token-based authentication to secure the application and manage user sessions efficiently.

   Google Maps API: Integrated Google Maps for dynamic location visualization. The map is configured to center around “925 Bush St. San Francisco, CA 94109” to maintain consistency.

   Error Handling: Implemented robust error handling to manage API request failures, token expiration, and provide user-friendly messages.

   Performance Optimization: Designed the application to handle multiple markers efficiently, ensuring smooth performance even when multiple locations are displayed.

5. Future Improvements

   User Profile Management: Implement features to allow users to manage their profiles and preferences.

   Real-time Data Sync: Integrate WebSockets or a similar technology for real-time updates of location data.

   Custom Marker Icons: Consider adding options for custom marker icons and clustering for enhanced visualization when dealing with numerous entries.

   Offline Support: Evaluate the possibility of adding offline functionality so users can access some features without an internet connection.

6. Testing Strategy

   Unit Testing: Use Jest for unit tests, focusing on validating individual components and functions.

   Integration Testing: Apply React Native Testing Library for integration tests to ensure components interact correctly.

   Running Tests: To execute the test suite, go to your project directory and run: