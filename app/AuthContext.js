import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const baseURL = "http://192.168.1.181:8080"

const API = axios.create({
  baseURL,
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);


  useEffect(() => {
    const loadTokens = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    };
    loadTokens();
  }, []);

  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwt_decode(token);
    return Date.now() >= exp * 1000;
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username,
        password,
      });
      const { access_token, refresh_token } = response.data;
      // console.log("chk", access_token, refresh_token)

      if (access_token) Alert.alert('Login Successful');
      else Alert.alert('Invalid credentials');

      await AsyncStorage.setItem('accessToken', access_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    }
    catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again later.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Please enter valid username and password.";
            break;
          case 401:
            errorMessage = "Invalid credentials. Please check your username and password.";
            break;
          case 500:
            errorMessage = "There was an issue with the server. Please try again later.";
            break;
          default:
            errorMessage = "Oops! Something went wrong. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your internet connection.";
      } else {
        errorMessage = "An error occurred. Please try again.";
      }

      console.error(errorMessage);
      alert(errorMessage);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${baseURL}/refresh`, {
        token: refreshToken,
      });
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      await AsyncStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    const interceptor = API.interceptors.request.use(
      async (config) => {
        if (isTokenExpired(accessToken)) {
          const newToken = await refreshAccessToken();
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Clean up the interceptor when the component unmounts
    return () => API.interceptors.request.eject(interceptor);
  }, [accessToken, refreshToken]);

  const value = {
    accessToken,
    login,
    logout,
    refreshAccessToken,
    isTokenExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default API;
