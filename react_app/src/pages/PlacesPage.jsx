import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PlaceComponent from "../components/PlaceComponent";

export default function PlacesPage() {
    const { city } = useParams();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/placesbycity/${city}`);
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        }
        fetchPlaces();
    }, [city]);

    return (
        <div>
            <h1>Places in {city}</h1>
            <div>
                {places.map((place) => (
                    <PlaceComponent key={place.id} place={place} />
                ))}
            </div>
        </div>
    );
}