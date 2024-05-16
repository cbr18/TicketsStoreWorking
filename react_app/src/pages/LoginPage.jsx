import React, { useState } from 'react';
import useAuth from '../hooks/use-auth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error, login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;