import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('user');

    if (!currentUser && !token) {
        return <Navigate to='/login' replace />
    }
    
    return children;
}

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('user');

    if (!currentUser && !token) {
        return children;
    }
    
    return <Navigate to='/dashboard' replace />
}