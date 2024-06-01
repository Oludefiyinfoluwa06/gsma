import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useEvent } from '../../hooks/useEvent';
import NoEvents from '../../components/events/NoEvents';

const AllEvents = () => {
    const { getAllEvents, allEvents } = useEvent();

    const navigate = useNavigate();
    
    useEffect(() => {
        getAllEvents();
    }, [getAllEvents]);
    
    return (
        <div className='text-white w-full overflow-y-auto no-scrollbar p-6 md:pl-2'>
            {allEvents.length > 0 ? (
                <div>
                    {allEvents.map(event => {
                        const eventYear = event.date.split('-')[0];
                        const eventMonth = event.date.split('-')[1];
                        const eventDay = event.date.split('-')[2];

                        const presentYear = new Date().getFullYear();
                        const presentMonth = new Date().getMonth();
                        const presentDay = new Date().getDate();
                        return (
                            <div key={event._id} onClick={() => navigate(`/events/${event._id}`)} className="mb-3 cursor-pointer bg-[rgba(255,255,255,0.25)] p-2 rounded-md">
                                <h1 className="md:text-[20px] text-[14px] font-bold">{event.title}</h1>
                                <p className="md:text-[15px] text-[13px] text-ellipsis mt-1">{(eventYear < presentYear) ? 'Took' : ((eventYear === presentYear) && (eventMonth - 1 < presentMonth)) ? 'Took' : (eventMonth - 1 === presentMonth) && (eventDay < presentDay) ? 'Took' : 'Taking'} place on: {event.date.split('T')[0]}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <NoEvents />
            )}
        </div>
    );
}

export default AllEvents;