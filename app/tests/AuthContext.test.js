// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import { AuthProvider, useAuth } from '../AuthContext';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Mock axios and AsyncStorage
// jest.mock('axios');
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
// }));

// describe('AuthProvider', () => {
//   it('should load stored tokens on mount', async () => {
//     // Mock stored tokens
//     AsyncStorage.getItem.mockResolvedValueOnce('mockAccessToken');
//     AsyncStorage.getItem.mockResolvedValueOnce('mockRefreshToken');

//     const { result } = render(
//       <AuthProvider>
//         <TestComponent />
//       </AuthProvider>
//     );

//     await waitFor(() => expect(result.current.accessToken).toBe('mockAccessToken'));
//   });

//   it('should login successfully', async () => {
//     const loginResponse = {
//       data: {
//         access_token: 'mockAccessToken',
//         refresh_token: 'mockRefreshToken',
//       },
//     };

//     axios.post.mockResolvedValueOnce(loginResponse);

//     const { getByPlaceholderText, getByText } = render(
//       <AuthProvider>
//         <LoginScreen />
//       </AuthProvider>
//     );

//     fireEvent.changeText(getByPlaceholderText('Username'), 'user');
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password');
//     fireEvent.press(getByText('Login'));

//     await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', 'mockAccessToken'));
//     expect(AsyncStorage.setItem).toHaveBeenCalledWith('refreshToken', 'mockRefreshToken');
//   });

//   it('should logout correctly', async () => {
//     const { result } = render(
//       <AuthProvider>
//         <TestComponent />
//       </AuthProvider>
//     );

//     result.current.logout();

//     await waitFor(() => {
//       expect(AsyncStorage.removeItem).toHaveBeenCalledWith('accessToken');
//       expect(AsyncStorage.removeItem).toHaveBeenCalledWith('refreshToken');
//     });
//   });
// });

// const TestComponent = () => {
//   const { accessToken } = useAuth();
//   return <Text>{accessToken}</Text>;
// };
