import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library


const API_URL = 'http://localhost:8000/api';

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedAccessToken = Cookies.get('access_token');
    const storedRefreshToken = Cookies.get('refresh_token');
    const storedIsAuthorized = Cookies.get('isAuthorized'); // Check for isAuthorized cookie

    if (storedAccessToken && storedRefreshToken && storedIsAuthorized === 'true') {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/token/`, credentials);
      const { access, refresh} = response.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      setUsername(credentials.username); // Check if user exists in response
      setIsAuthenticated(true);
      Cookies.set('access_token', access, response.data.expires_in);
      Cookies.set('refresh_token', refresh, response.data.refresh_expires_in);
      Cookies.set('username', credentials.username); // Set username
      Cookies.set('isAuthorized', true); // Set isAuthorized to true on successful login
    } catch (error) {
      setIsAuthenticated(false);
      setUsername(null);
      if (error.response) {
        setError(error.response.data.message || 'Invalid username or password');
      } else {
        setError('An error occurred during login');
      }
    }

  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    setUsername(null);
    setError('');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('username');
    Cookies.remove('isAuthorized'); // Remove isAuthorized cookie on logout
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${API_URL}/refresh-token/`, { refresh: refreshToken });
      const { access, refresh} = response.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      setIsAuthenticated(true);

      Cookies.set('access_token', access, response.data.expires_in);
      Cookies.set('refresh_token', refresh, response.data.refresh_expires_in);
      Cookies.set('username', username);
    } catch (error) {
      setIsAuthenticated(false);
      setUsername(null);
      setError(error.response.data.message || 'Error refreshing token');
    }
  };

  const getUsername = () => {
    return Cookies.get('username');
  };

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    error,
    username,
    getUsername,
    login,
    logout,
    refreshAccessToken,
    authAxios,
  };
};

export default useAuth;
