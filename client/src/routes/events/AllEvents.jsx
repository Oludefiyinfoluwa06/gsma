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
                    {allEvents.map(event => (
                        <div key={event._id} onClick={() => navigate(`/events/${event._id}`)} className="mb-3 cursor-pointer bg-[rgba(255,255,255,0.25)] p-2 rounded-md">
                            <h1 className="md:text-[20px] text-[14px] font-bold">{event.title}</h1>
                            <p className="md:text-[15px] text-[13px] text-ellipsis">{event.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <NoEvents />
            )}
        </div>
    );
}

export default AllEvents;