import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { logout } = useAuth();
    
    return (
        <div>
            Home
            <button onClick={async () => await logout()}>Logout</button>
        </div>
    );
}

export default Home;