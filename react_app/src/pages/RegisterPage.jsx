import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/use-auth';
const API_URL = 'http://localhost:8000/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
      return <Navigate to="/" />;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');



    try {
      const response = await axios.post(
        `${API_URL}/register/`,
        { username, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Registration successful');
      login({ username, password });

      

      // Дополнительная логика после успешной регистрации

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // Сервер вернул ответ с ошибкой
        setError(error.response.data);
        console.error('Error:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // Запрос был отправлен, но не получен ответ
        setError('No response received');
        console.error('No response received:', error.request);
      } else {
        // Что-то пошло не так при настройке запроса
        setError('Error setting up request');
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;