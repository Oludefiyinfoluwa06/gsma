import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = async (email, password) => {
        setLoading(true);

        try {
            // setCurrentUser(email);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        setLoading(true);

        try {
            // setCurrentUser(email);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setCurrentUser(null);
    }

    const values = {
        currentUser,
        signup,
        login,
        logout,
        loading
    }
    
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}