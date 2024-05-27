import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [allEvents, setAllEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [event, setEvent] = useState({});

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const createEvent = async (title, description, date) => {
        setLoading(true);

        try { 
            await axios.post('http://localhost:5000/api/events/create', { title, description, date }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate('/events');
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
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

    const getEventDetails = async (eventId) => {
        try { 
            const response = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setEvent(response.data.event);
        } catch (error) {
            console.log(error);
            setError(error.response.data.error);
        }
    }

    const editEvent = async (id, title, description, date) => {
        setLoading(true);

        try { 
            await axios.post(`http://localhost:5000/api/events/${id}/edit`, { title, description, date }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate(`/events/${id}`);
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const deleteEvent = async (id) => {
        try { 
            await axios.delete(`http://localhost:5000/api/events/${id}/delete`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate(`/events`);
        } catch (error) {
            setError(error.response.data.error);
        }
    }
    
    const values = {
        createEvent,
        getAllEvents,
        getMyEvents,
        getEventDetails,
        editEvent,
        deleteEvent,
        allEvents,
        myEvents,
        event,
        error,
        setError,
        loading
    }

    return (
        <EventContext.Provider value={values}>
            {children}
        </EventContext.Provider>
    );
}