import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';

import { sidebarLinks, styles } from "../constants";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
    const navigate = useNavigate();

    const { logout } = useAuth();
    
    return (
        <aside className='bg-slate-800 md:w-[200px] sm:block sm:w-[60px] hidden'>
            <ul className="w-full space-y-3 mt-6">
                {sidebarLinks.map(item => {
                    const isActive = window.location.pathname === item.route;

                    return (
                        <li key={item.id} className={`${styles.sidebarLinks} ${isActive ? 'bg-blue-600' : ''}`} onClick={() => navigate(`${item.route}`)}>{item.icon} <p className="hidden md:block">{item.label}</p></li>
                    )
                    
                })}

                <button className={`${styles.sidebarLinks}`} onClick={async () => await logout()}><FaSignOutAlt className="text-[17px] md:mr-2" /> <p className="hidden md:block">Logout</p></button>

            </ul>
        </aside>
    );
}

export default Sidebar;