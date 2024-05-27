import { useEffect } from "react";

import { useEvent } from '../../hooks/useEvent';
import NoEvents from '../../components/events/NoEvents';

const MyEvents = () => {
    const { getAllEvents, myEvents } = useEvent();
    
    useEffect(() => {
        getAllEvents();
    }, [getAllEvents]);

    return (
        <div className='text-white w-full overflow-y-auto no-scrollbar p-6 md:pl-2'>
            {myEvents.length > 0 ? (
                <div>
                    {myEvents.map(event => (
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

export default MyEvents;