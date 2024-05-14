import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const getUserProfile = async (email) => {
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:5000/api/profile?email=${email}`);

            console.log(response);
            setUser(response.data.profile);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const profileSetup = async (email, username, fullname, institutionName, major, yearOfStudy, studentId, universityEmail, profilePicture) => {
        setLoading(true);

        try {
            const response = await axios.get('http://localhost:5000/api/profile/profile-setup', { email, username, fullname, institutionName, major, yearOfStudy, studentId, universityEmail, profilePicture });

            console.log(response);
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const values = {
        getUserProfile,
        profileSetup,
        loading,
        user,
        error,
        setError
    }

    return (
        <ProfileContext.Provider value={values}>
            {children}
        </ProfileContext.Provider>
    );
}