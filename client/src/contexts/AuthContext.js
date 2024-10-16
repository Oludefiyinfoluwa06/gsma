import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [next, setNext] = useState(false);

    const navigate = useNavigate();

    const signup = async (username, email, password) => {
        setLoading(true);

        try {
            const response = await axios.post('https://gsma-server.vercel.app/api/auth/signup', { username, email, password });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        setLoading(true);

        try {
            const response = await axios.post('https://gsma-server.vercel.app/api/auth/login', { email, password });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    const getOtp = async (email) => {
        setLoading(true);

        try {
            const response = await axios.post('https://gsma-server.vercel.app/api/auth/get-otp', { email });

            if (response) {
                localStorage.setItem('otp', response.data.otp);
                localStorage.setItem('email', email);
                setNext(true);
            }
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const checkOtp = async (otp) => {
        const storedOtp = localStorage.getItem('otp');

        if (otp !== storedOtp) return setError('Enter the correct OTP');

        localStorage.removeItem('otp');
        navigate('/reset-password');
    }

    const resetPassword = async (password) => {
        setLoading(true);

        const email = localStorage.getItem('email');

        try {
            await axios.put('https://gsma-server.vercel.app/api/auth/reset-password', { email, password });

            localStorage.removeItem('email');
            navigate('/login');
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const values = {
        signup,
        login,
        logout,
        getOtp,
        checkOtp,
        resetPassword,
        loading,
        error,
        setError,
        next,
        setNext
    }
    
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}