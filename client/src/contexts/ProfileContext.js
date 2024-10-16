import axios from "axios";
import { useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const getUserProfile = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('https://gsma-server.vercel.app/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setUser(response.data.profile);
        } catch (error) {
            console.log(error)
            if (error.response.data === 'Please, authenticate') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return navigate('/login');
            }

            if (error.response.data.error === 'User profile does not exist') {
                navigate('/profile/setup');
            }

        }
    }

    const profileSetup = async (firstname, lastname, institutionName, major, yearOfStudy, studentId) => {
        const token = localStorage.getItem('token');

        setLoading(true);

        try {
            await axios.post('https://gsma-server.vercel.app/api/profile/profile-setup', { firstname, lastname, institutionName, major, yearOfStudy, studentId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate('/profile');
        } catch (error) {
            setError(error.response.data.error);

            if (error.response.data === 'Please, authenticate') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }

    const profileUpdate = async (firstname, lastname, institutionName, major, yearOfStudy, studentId) => {
        const token = localStorage.getItem('token');

        setLoading(true);

        try {
            const response = await axios.post('https://gsma-server.vercel.app/api/profile/profile-update', { firstname, lastname, institutionName, major, yearOfStudy, studentId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);
        } catch (error) {
            setError(error.response.data.error);

            if (error.response.data === 'Please, authenticate') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }

    const profilePictureUpload = async (picture) => {
        const token = localStorage.getItem('token');

        setLoading(true);

        const formData = new FormData();
        formData.append('profilePicture', picture);
        
        try {
            const response = await axios.post('https://gsma-server.vercel.app/api/pictures/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            localStorage.setItem('profilePicture', JSON.stringify(response.data.profilePic));
        } catch (error) {
            console.log(error);
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const values = {
        getUserProfile,
        profileSetup,
        profileUpdate,
        profilePictureUpload,
        loading,
        error,
        setError,
        user
    }

    return (
        <ProfileContext.Provider value={values}>
            {children}
        </ProfileContext.Provider>
    );
}