import { createContext, useState } from "react";
import axios from 'axios';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [allEvents, setAllEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);

    const token = localStorage.getItem('token');

    const createEvent = async () => {

    }

    const getAllEvents = async () => {
        try { 
            const response = await axios.get('http://localhost:5000/api/events/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setAllEvents(response.data.events);
        } catch (error) {
            console.log(error);
        }
    }

    const getMyEvents = async () => {
        try { 
            const response = await axios.get('http://localhost:5000/api/events/my-events', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMyEvents(response.data.events);
        } catch (error) {
            console.log(error);
        }
    }
    
    const values = {
        createEvent,
        getAllEvents,
        getMyEvents,
        allEvents,
        myEvents
    }

    return (
        <EventContext.Provider value={values}>
            {children}
        </EventContext.Provider>
    );
}