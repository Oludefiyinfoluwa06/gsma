import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userEmail = localStorage.getItem('email');

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/profile?email=${userEmail}`);

            setUser(response.data.profile);
        } catch (error) {
            console.log(error);
        }
    }

    const profileSetup = async (email, username, fullname, institutionName, major, yearOfStudy, studentId) => {
        setLoading(true);

        try {
            await axios.post('http://localhost:5000/api/profile/profile-setup', { email, username, fullname, institutionName, major, yearOfStudy, studentId });

            window.location.reload();
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const profileUpdate = async (username, fullname, institutionName, major, yearOfStudy, studentId) => {
        setLoading(true);

        try {
            await axios.post(`http://localhost:5000/api/profile/profile-update?email=${userEmail}`, { username, fullname, institutionName, major, yearOfStudy, studentId });
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const profilePictureUpload = async (picture) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('profilePicture', picture);
        
        try {
            const response = await axios.post('http://localhost:5000/api/profile/picture-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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