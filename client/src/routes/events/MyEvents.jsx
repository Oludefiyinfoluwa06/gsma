import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useEvent } from '../../hooks/useEvent';
import NoEvents from '../../components/events/NoEvents';

const MyEvents = () => {
    const { getMyEvents, myEvents } = useEvent();

    const navigate = useNavigate();
    
    useEffect(() => {
        getMyEvents();
    }, [getMyEvents]);

    return (
        <div className='text-white w-full overflow-y-auto no-scrollbar p-6 md:pl-2'>
            {myEvents.length > 0 ? (
                <div>
                    {myEvents.map(event => (
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

export default MyEvents;