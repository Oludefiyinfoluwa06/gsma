import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { images } from "../constants";

const Navbar = ({ setOpenNav }) => {
    const navigate = useNavigate();

    const [pictureUrl, setPictureUrl] = useState('');
    const profilePic = JSON.parse(localStorage.getItem('profilePicture'));

    useEffect(() => {
        if (profilePic) return setPictureUrl(profilePic.imgUrl);
    }, [profilePic]);

    const handleOpenNav = () => {
        setOpenNav(prev => !prev);
    }

    return (
        <nav className="flex items-center justify-between gap-2 w-full bg-slate-800 p-4">
            <label className="text-white">GSMA</label>

            <div className="flex items-center justify-start gap-4">
                <div className="w-[35px] h-[35px] rounded-full cursor-pointer" onClick={() => navigate('/profile')}>
                    <img src={pictureUrl ? pictureUrl : images.user} alt="Profile" className='w-full h-full rounded-full object-center object-cover' />
                </div>
                <FaBars className="text-white sm:hidden block cursor-pointer text-[20px]" onClick={handleOpenNav} />
            </div>
        </nav>
    );
}

export default Navbar;