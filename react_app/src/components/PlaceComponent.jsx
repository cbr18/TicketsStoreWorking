import React from "react";
import axios from "axios";

export default function PlaceComponent({ place }) {
    const { id, name, city, address, capacity_standing: capacity_standing, capacity_seats } = place;
    return (
        <div>
            <h2>{name}</h2>
            <p>City: {city}</p>
            <p>Address: {address}</p>
            <p>Capacity standings: {capacity_standing}</p>
            <p>Capacity seats: {capacity_seats}</p>
            <button
                onClick={() => {
                    axios
                        .delete(`http://localhost:8000/places/${id}`)
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }}
            >
                Delete
            </button>
        </div>
    );
}
