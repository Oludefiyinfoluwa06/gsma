import { FaCalendarTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const NoEvents = () => {
    return (
        <div className="flex items-center justify-center gap-[20px] flex-col min-h-[calc(100vh-100px)]">
            <FaCalendarTimes className="text-[200px]" />
            <p className="text-[20px]">There are no events</p>
            <Link to='/events/add' className='text-[15px] font-bold bg-slate-100 text-slate-800 px-[20px] py-[8px] rounded-lg'>Create an event</Link>
        </div>
    );
}

export default NoEvents;