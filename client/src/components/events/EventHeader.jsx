import { useNavigate } from 'react-router-dom';
import { eventLinks } from '../../constants';

const EventHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-6 pb-2 md:mr-6 flex items-center md:justify-start justify-center gap-[25px] border-b-2 border-gray-700 text-white">
            {eventLinks.map(link => {
                const isActive = window.location.pathname === link.route;

                return (
                    <p key={link.id} onClick={() => navigate(link.route)} className={`md:text-[20px] text-[15px] cursor-pointer ${isActive ? 'text-blue-600 font-bold' : 'text-white'}`}>{link.label}</p>
                )
            })}
        </div>
    );
}

export default EventHeader;