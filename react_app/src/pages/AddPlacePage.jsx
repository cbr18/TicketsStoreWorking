import React, { useEffect, useState } from "react";
import axios from 'axios';
import useAuth from '../hooks/use-auth';
import CreatableSelect from 'react-select/creatable';
import { Navigate } from 'react-router-dom';


const API_URL = 'http://localhost:8000/';



const AddPlacePage = () => {
  const auth = useAuth();
  const [name, setName] = useState('');
  const [city, setCity] = useState({});
  const [address, setAddress] = useState('');
  const [capacity_standings, setCapacity] = useState(0);
  const [capacity_seats, setSeats] = useState(0);
  const [error, setError] = useState('');
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
  
  const handleSubmit = async (e) => {
          console.log({
              name,
              city,
              address,
              capacity_standings,
              capacity_seats
          });
    e.preventDefault();
    setError('');
      try {
      await axios.post(
        `${API_URL}/places/`,
        {
          name,
          city: city.label,
          address,
          capacity_standings,
          capacity_seats
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        }
        );
        alert('Place added successfully');
        return <Navigate to="/" />
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        console.error('Error:', error.response.data);
        console.error('Status:', error.response.status);

      } else {
        setError('An unknown error occurred');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h1>Add Place</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <CreatableSelect
          options={cities}
          value={city}
          onChange={value => setCity(value)}
        />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Capacity:
          <input type="number" value={capacity_standings} onChange={(e) => setCapacity(e.target.value)} />
        </label>
        <label>
          Seats:
          <input type="number" value={capacity_seats} onChange={(e) => setSeats(e.target.value)} />
        </label>
        <button type="submit">Add Place</button>
      </form>
    </div>
  );
};

export default AddPlacePage; 