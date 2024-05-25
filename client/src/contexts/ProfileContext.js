import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const profilePictureUpload = async (picture) => {
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:5000/api/profile/picture-upload', { picture }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const values = {
        profileSetup,
        profilePictureUpload,
        loading,
        error,
        setError
    }

    return (
        <ProfileContext.Provider value={values}>
            {children}
        </ProfileContext.Provider>
    );
}