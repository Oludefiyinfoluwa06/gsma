import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setOpenNav }) => {
    const navigate = useNavigate();

    const handleOpenNav = () => {
        setOpenNav(prev => !prev);
    }

    return (
        <nav className="flex items-center justify-between gap-2 w-full bg-slate-800 p-4">
            <label className="text-white">LOGO</label>

            <div className="flex items-center justify-start gap-4">
                <div className="bg-white w-[35px] h-[35px] rounded-full cursor-pointer" onClick={() => navigate('/profile')}>
                    {/* <img src="" alt="" /> */}
                </div>
                <FaBars className="text-white sm:hidden block cursor-pointer text-[20px]" onClick={handleOpenNav} />
            </div>
        </nav>
    );
}

export default Navbar;