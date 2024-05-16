import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import useAuth from '../hooks/use-auth';


const API_URL = 'http://localhost:8000/';

const AddEventPage = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [description, setDescription] = useState("");
    const [minAge, setMinAge] = useState("");
    const [error, setError] = useState("");
    const [cities, setCities] = useState([]);
    const [places, setPlaces] = useState([]);
    const [city, setCity] = useState({});
    const [place, setPlace] = useState({});
    const auth = useAuth();

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


    const fetchPlaces = async () => {
        try {
            const response = await axios.get(`${API_URL}/placesbycity/${city.value}/`);
            setPlaces(response.data);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };




    return (
        <div>
            <h1>Add Event</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");
                    try {
                        await axios.post(
                            `${API_URL}/events/`,
                            {
                                name,
                                date,
                                placeId,
                                description,
                                minAge
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${auth.accessToken}`
                                }
                            }
                        );
                        alert("Event added successfully");
                    } catch (error) {
                        if (error.response) {
                            setError(error.response.data);
                        }
                    }
                }}
            >
                <div>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={cities[0]}
                        isClearable
                        isSearchable
                        name="city"
                        options={cities}
                        onChange={(newValue) => {
                            setCity(newValue);
                            fetchPlaces();
                        }}
                    />
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={places[0]}
                        isClearable
                        isSearchable
                        name="place"
                        options={places}
                        onChange={(newValue) => {
                            setPlace(newValue);
                        }}
                        value={place.name}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="text" 
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>    
                </form>
        </div>
    );
                
    
}

export default AddEventPage;