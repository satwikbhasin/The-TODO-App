import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();
const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const signup = async (username, password) => {
        try {
            const response = await fetch(backendUrl + 'users/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to signup');
            }

            const { token } = await response.json();

            setCurrentUser({ username });
            setIsLoggedIn(true);
            Cookies.set('todoApp-username', username, { expires: 3, path: '/' });
            Cookies.set('todoApp-authToken', token, { expires: 3, path: '/' });

            return;
        } catch (error) {
            throw new Error(error);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await fetch(backendUrl + 'users/getToken/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const { token } = await response.json();

            setCurrentUser({ username });
            setIsLoggedIn(true);
            Cookies.set('todoApp-username', username, { expires: 3, path: '/' });
            Cookies.set('todoApp-authToken', token, { expires: 3, path: '/' });

            return;
        } catch (error) {
            throw new Error(error);
        }
    };

    const validateToken = async (token, username) => {
        const response = await fetch(backendUrl + 'users/validateToken/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, username }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.valid;
        } else {
            return false;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        Cookies.remove('todoApp-username', { path: '/' });
        Cookies.remove('todoApp-authToken', { path: '/' });
    };

    useEffect(() => {
        const checkAndUpdateToken = async () => {
            const token = Cookies.get('todoApp-authToken');
            const username = Cookies.get('todoApp-username');
            if (!token || !(await validateToken(token, username))) {
                logout();
                setLoading(false);
                return;
            }
            setCurrentUser({ username });
            setIsLoggedIn(true);
            setLoading(false);
        };

        checkAndUpdateToken();
    }, []);

    const value = {
        currentUser,
        isLoggedIn,
        login,
        logout,
        signup,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};