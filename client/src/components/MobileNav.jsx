import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { sidebarLinks, styles } from "../constants";
import { useAuth } from "../hooks/useAuth";

const MobileNav = ({ openNav, setOpenNav }) => {
    const navigate = useNavigate();

    const { logout } = useAuth();

    return (
        <aside className={`bg-slate-800 w-[200px] h-[calc(100vh-70px)] absolute ${openNav ? 'left-0' : 'left-[-200px]'} transform transition-all`}>
            <ul className="w-full space-y-3 mt-6">
                {sidebarLinks.map(item => {
                    const isActive = window.location.pathname === item.route;

                    return (
                        <li className={`${styles.mobileNav} ${isActive ? 'bg-blue-600' : ''}`} onClick={() => {
                            setOpenNav(false);
                            navigate(`${item.route}`);
                        }}>{item.icon} {item.label}</li>
                    )
                    
                })}

                <button className={`${styles.mobileNav}`} onClick={async () => await logout()}><FaSignOutAlt className="text-[17px] mr-2" /> Logout</button>
            </ul>
        </aside>
    );
}

export default MobileNav;