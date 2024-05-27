import { Outlet } from "react-router-dom";
import EventHeader from "../components/events/EventHeader";

const EventLayout = () => {
    return (
        <div className="w-full overflow-y-auto no-scrollbar">
            <EventHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default EventLayout;