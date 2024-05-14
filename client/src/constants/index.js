import { FaCalendar, FaEnvelope, FaHome, FaUser } from "react-icons/fa";

export const styles = {
    sidebarLinks: 'p-3 w-full text-white cursor-pointer flex items-center justify-center md:justify-start gap-2 rounded-lg',
    sidebarIcons: 'text-[17px] md:mr-2',
    mobileNav: 'p-3 w-full text-white cursor-pointer flex items-center justify-start gap-2 rounded-lg',
}

export const sidebarLinks = [
    {
        id: 1,
        route: '/',
        label: 'Home',
        icon: <FaHome className={`${styles.sidebarIcons}`} />
    },
    {
        id: 2,
        route: '/events',
        label: 'Events',
        icon: <FaCalendar className={`${styles.sidebarIcons}`} />
    },
    {
        id: 3,
        route: '/chats',
        label: 'Chats',
        icon: <FaEnvelope className={`${styles.sidebarIcons}`} />
    },
    {
        id: 4,
        route: '/profile',
        label: 'Profile',
        icon: <FaUser className={`${styles.sidebarIcons}`} />
    },
];