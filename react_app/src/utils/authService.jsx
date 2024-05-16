// utils/authService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Замените на свой URL

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/token/`, { email, password });
  const accessToken = response.data.access;
  const user = { email };
  return { accessToken, user };
};

const authService = {
  login,
};

export default authService;