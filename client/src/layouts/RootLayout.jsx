import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileNav from '../components/MobileNav';

const RootLayout = () => {
    const [openNav, setOpenNav] = useState(false);

    return (
        <>
            <div className='bg-slate-900 h-screen'>
                <Navbar setOpenNav={setOpenNav} />
                <main className='flex justify-start gap-4 h-[calc(100vh-70px)] w-full overflow-hidden'>
                    <Sidebar />
                    <MobileNav openNav={openNav} setOpenNav={setOpenNav} />
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default RootLayout;
