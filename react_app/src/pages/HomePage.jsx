import React, { useEffect, useState } from "react";
import axios from 'axios';
import useAuth from '../hooks/use-auth';
import Select from 'react-select';
import { Navigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

const HomePage = () => {
  const { isAuthenticated, getUsername } = useAuth();  
  const [city, setCity] = useState({});
  const [cities, setCities] = useState([]);



  useEffect(() => {
  const fetchCities = async () => {
    try {
      if (cities.length === 0) {
        const response = await axios.get(`${API_URL}/cities/`);
        setCities(response.data);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  fetchCities();
}, [cities.length]);

  return (
    <div>

      {isAuthenticated && <h1>Hello, {getUsername()}</h1>}


        <Select
        className="basic-single"
        classNamePrefix="select"
        options={cities}
        defaultValue={cities[0]}
        placeholder="Выберите город"
        isSearchable
        onChange={(newValue) => {
          setCity(newValue); // Обновляем состояние выбранного города
        }}
      />

      {city.value && ( // Условно выводим навигацию с учетом значения города
        <Navigate to={`/${city.value}`} />
      
      )}
    </div>
  );
};

export default HomePage;