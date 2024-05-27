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
            const response = await axios.get('http://localhost:5000/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setUser(response.data.profile);
        } catch (error) {
            console.log(error);
            if (error.response.data.error === 'User profile does not exist') {
                navigate('/profile/setup');
            }
        }
    }

    const profileSetup = async (username, fullname, institutionName, major, yearOfStudy, studentId) => {
        const token = localStorage.getItem('token');

        setLoading(true);

        try {
            await axios.post('http://localhost:5000/api/profile/profile-setup', { username, fullname, institutionName, major, yearOfStudy, studentId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate('/profile');
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const profileUpdate = async (username, fullname, institutionName, major, yearOfStudy, studentId) => {
        const token = localStorage.getItem('token');

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/profile/profile-update', { username, fullname, institutionName, major, yearOfStudy, studentId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);
        } catch (error) {
            setError(error.response.data.error);
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
            const response = await axios.post('http://localhost:5000/api/profile/picture-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);
        } catch (error) {
            console.log(error);
            // setError(error.response.data.error);
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