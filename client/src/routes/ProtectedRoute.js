import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const currentUser = localStorage.getItem('user');

    if (!currentUser) {
        return <Navigate to='/login' replace />
    }
    
    return children;
}

export const PrivateRoute = ({ children }) => {
    const currentUser = localStorage.getItem('user');

    if (!currentUser) {
        return children;
    }
    
    return <Navigate to='/' replace />
}