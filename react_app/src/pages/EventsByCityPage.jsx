import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EventComponent from "../components/EventComponent";

export default function EventsByCityPage() {
    const { city } = useParams();
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/eventsbycity/${city}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, [city]);

    return (
        <div>
            <h1>Events in {city}</h1>

            {events.map((event) => (
                <EventComponent key={event.id} event={event} />
            ))}
        </div>
    )


}