import { Outlet } from "react-router-dom";

const ChatLayout = () => {
    return (
        <div className="w-full overflow-y-auto no-scrollbar">
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default ChatLayout;