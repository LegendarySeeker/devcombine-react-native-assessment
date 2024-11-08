// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import { AuthProvider } from '../AuthContext';
// import LoginScreen from '../LoginScreen';
// import axios from 'axios';

// // Mock axios
// jest.mock('axios');

// describe('LoginScreen', () => {
//   it('should call login function with correct parameters', async () => {
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

//     await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://192.168.1.181:8080/login', {
//       username: 'user',
//       password: 'password',
//     }));
//   });
// });
