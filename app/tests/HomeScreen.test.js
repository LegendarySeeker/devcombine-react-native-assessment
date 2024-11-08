// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import { AuthProvider } from '../AuthContext';
// import HomeScreen from '../HomeScreen';
// import axios from 'axios';

// // Mock axios
// jest.mock('axios');

// // Mock react-native-maps
// jest.mock('react-native-maps', () => ({
//   ...jest.requireActual('react-native-maps'),
//   Marker: jest.fn(),
// }));

// describe('HomeScreen', () => {
//   it('should fetch and display locations', async () => {
//     const mockLocations = [
//       { latitude: 37.789383, longitude: -122.411784, formattedAddress: 'Location 1', placeID: 'place1' },
//       { latitude: 37.790383, longitude: -122.412784, formattedAddress: 'Location 2', placeID: 'place2' },
//     ];

//     axios.get.mockResolvedValueOnce({ data: mockLocations });

//     const { getByText, getByTestId } = render(
//       <AuthProvider>
//         <HomeScreen />
//       </AuthProvider>
//     );

//     await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://192.168.1.181:8080/locations', expect.any(Object)));

//     // Verify the map markers
//     expect(getByTestId('map')).toBeTruthy();
//     expect(mockLocations.length).toBeGreaterThan(0);
//   });

//   it('should handle fetch error', async () => {
//     const errorMessage = 'Network Error';
//     axios.get.mockRejectedValueOnce(new Error(errorMessage));

//     const { getByText } = render(
//       <AuthProvider>
//         <HomeScreen />
//       </AuthProvider>
//     );

//     await waitFor(() => expect(getByText('Error: Network Error')).toBeTruthy());
//   });
// });
