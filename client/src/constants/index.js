import { FaCalendar, FaEnvelope, FaHome, FaPlus, FaUser, FaVideo } from "react-icons/fa";
import user from '../assets/user.png';

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

export const cardTypeList = [
    {
        id: 1,
        title: 'All Events',
        desc: 'View all events',
        bgClassName: 'bg-orange-600',
        icon: <FaCalendar />,
        route: '/events'
    },
    {
        id: 2,
        title: 'Create Event',
        desc: 'Create an event',
        bgClassName: 'bg-blue-600',
        icon: <FaPlus />,
        route: '/events/add'
    },
    {
        id: 3,
        title: 'Join Event',
        desc: 'Join a created event',
        bgClassName: 'bg-purple-600',
        icon: <FaVideo />,
    },
    {
        id: 4,
        title: 'Chats',
        desc: 'View all chats',
        bgClassName: 'bg-yellow-600',
        icon: <FaEnvelope />,
        route: '/chats'
    },
];

export const eventLinks = [
    {
        id: 1,
        route: '/events',
        label: 'All Events',
    },
    {
        id: 2,
        route: '/events/my-events',
        label: 'My Events',
    },
    {
        id: 3,
        route: '/events/add',
        label: 'Create Event',
    },
];

export const images = {
    user
}