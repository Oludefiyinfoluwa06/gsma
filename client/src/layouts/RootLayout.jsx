import { Outlet } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Sidebar />
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default RootLayout;