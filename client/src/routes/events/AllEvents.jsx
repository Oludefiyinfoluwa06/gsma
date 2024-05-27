import { useEffect } from "react";

import { useEvent } from '../../hooks/useEvent';
import NoEvents from '../../components/events/NoEvents';

const AllEvents = () => {
    const { getAllEvents, allEvents } = useEvent();
    
    useEffect(() => {
        getAllEvents();
    }, [getAllEvents]);
    
    return (
        <div className='text-white w-full overflow-y-auto no-scrollbar p-6 md:pl-2'>
            {allEvents.length > 0 ? (
                <div>
                    {allEvents.map(event => (
                        <div Key={event.id}>
                            <p>{event.title}</p>
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