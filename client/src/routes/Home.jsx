import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import heroImg from '../assets/hero-img.png';

const Home = () => {
    return (
        <div className="bg-slate-800 font-sans antialiased text-white leading-normal tracking-wider bg-cover h-screen">
            <header>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-semibold text-white">
                            <Link to="/" className="flex items-center space-x-2 text-white text-2xl font-bold hover:text-white">
                                <img src={logo} alt="Logo" className="w-12 h-12" />
                                <span>GSMA</span>
                            </Link>
                        </div>
                        <nav className="flex items-center space-x-4">
                            <Link to="/home" className="text-white hover:text-white">Home</Link>
                            <Link to="/login" className="text-white hover:text-white">Login</Link>
                            <Link to="/register" className="bg-slate-900 text-white px-4 py-2 rounded">Register</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2">
                        <h1 className="text-4xl font-bold text-white leading-tight">Connect and collaborate globally</h1>
                        <p className="mt-4 text-white">Discover and join a vibrant community of students worldwide. Whether you're looking to host a study group, organize cultural exchanges, or simply make new friends from different countries, our app empowers you to create, discover, and attend events that matter to you.</p>
                        <Link to="/register" className="mt-6 inline-block bg-slate-900 text-white px-6 py-3 rounded shadow">Get started</Link>
                    </div>
                    <div className="hidden md:block w-full md:w-1/2">
                        <img src={heroImg} alt="GSMA" className="rounded-lg"/>
                    </div>
                </div>
            </main>

        </div>
    );
}

export default Home;
