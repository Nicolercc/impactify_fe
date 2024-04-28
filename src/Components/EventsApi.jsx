import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventsApi = () => {
    const briteAPIKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
    const briteToken = import.meta.env.VITE_EVENTBRITE_PRIVATE_TOKEN


    const [mobilizeEvents, setMobilizeEvents] = useState([]);
    const [eventbriteEvents, setEventbriteEvents] = useState([]);

    useEffect(() => {
        const fetchMobilizeEvents = async () => {
            try {
                const response = await axios.get("https://api.mobilize.us/v1/events", {
                    params: {
                        location: 'New York, NY'
                    }
                });
                setMobilizeEvents(response.data.data);
            } catch (error) {
                console.error('Error fetching Mobilize Events:', error);
            }
        };

        fetchMobilizeEvents();
    }, []);

    // useEffect(() => {
    //     const fetchEventbriteEvents = async () => {
    //         const eventbriteUrl = 'https://www.eventbriteapi.com/v3/organizations/search/';
    //         const params = {
    //             q: 'New York',
    //             'location.address': 'New York'
    //         };
    //         const config = {
    //             headers: {
    //                 'Authorization': `Bearer ${briteAPIKey}`
    //             },
    //             params: params
    //         };

    //         try {
    //             const response = await axios.get(eventbriteUrl, config);
    //             setEventbriteEvents(response.data.events); // Assuming the structure of response.data.events
    //         } catch (error) {
    //             console.error('Error fetching Eventbrite Events:', error);
    //         }
    //     };

    //     fetchEventbriteEvents();
    // }, [briteAPIKey]);

 let mobilizeEvent = mobilizeEvents[0]
 console.log(mobilizeEvent)

    return (
        <div>
            <h2>Events in New York</h2>
            <h3>Mobilize Events</h3>
            <ul>
                {mobilizeEvents.map(event => (
                    <li key={event.id}>
                        {event.title} 
                    </li>
                ))}
            </ul>
            <h3>Eventbrite Events</h3>
            <ul>
                {eventbriteEvents.map(event => (
                    <li key={event.id}>
                        {event.name.text} - {event.description.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsApi;
