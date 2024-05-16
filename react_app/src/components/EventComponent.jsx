import React from "react";
import axios from "axios";

export default function EventComponent({ event }) {
    const { id, name, place, date, minAge, description } = event;
    return (
        <div>
            <h2>{name}</h2>
            <p>Place: {place.name}</p>
            <p>Date: {date}</p>
            <p>Address: {place.address}</p>
            <p>Age limit: {minAge}</p>
            <p>desc: {description}</p>
            <button
                onClick={() => {
                    axios
                        .delete(`http://localhost:8000/events/${id}`)
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
