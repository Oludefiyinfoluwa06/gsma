import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
    return (
        <div className="w-full overflow-y-auto no-scrollbar">
            <Outlet />
        </div>
    );
}

export default ProfileLayout;