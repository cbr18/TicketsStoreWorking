import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Список событий</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <p>Место: {event.place.name}, {event.place.city}, {event.place.address}</p>
          <p>Дата: {event.date}</p>
          <p>Минимальный возраст: {event.minAge}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventsPage;