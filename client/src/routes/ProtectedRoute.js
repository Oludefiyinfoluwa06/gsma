import { useAuth } from '../hooks/useAuth'; 
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser == null) {
        return <Navigate to='/login' replace/>
    }

    return children;
}

export default ProtectedRoute;