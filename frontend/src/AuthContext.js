/**
 * @file This file defines the AuthContext used for managing authentication state across the React application.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

/**
 * @typedef {Object} AuthContextValue
 * @property {Object} currentUser - The current user object.
 * @property {boolean} isLoggedIn - Indicates if the user is logged in.
 * @property {Function} login - Function to log in a user.
 * @property {Function} logout - Function to log out the current user.
 * @property {Function} signup - Function to sign up a new user.
 * @property {boolean} loading - Indicates if the authentication state is still loading.
 */

/**
 * @type {React.Context<AuthContextValue>}
 */
const AuthContext = createContext();

// Using the BACKEND_API_URL environment variable to determine the backend URL
const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

/**
 * Custom hook to use the AuthContext.
 * @returns {AuthContextValue} The AuthContext value.
 */
export function useAuth() {
    return useContext(AuthContext);
}

/**
 * Provider component that wraps around parts of the app needing auth state.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * Function to sign up a new user.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @throws {Error} If the signup fails.
     */
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

    /**
     * Function to log in a user.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @throws {Error} If the login fails.
     */
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

    /**
     * Function to validate the user's token by sending it to the backend and checking the response.
     * @param {string} token - The authentication token.
     * @param {string} username - The username of the user.
     * @returns {Promise<boolean>} A promise that resolves to true if the token is valid, false otherwise.
     */
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

    /**
     * Function to log out the current user.
     */
    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        Cookies.remove('todoApp-username', { path: '/' });
        Cookies.remove('todoApp-authToken', { path: '/' });
    };

    /**
     * Effect to authenticate user on initial load.
     */
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

    /**
     * The value provided to the context consumers.
     * @type {AuthContextValue}
     */
    const value = {
        currentUser,
        isLoggedIn,
        login,
        logout,
        signup,
        loading
    };

    // Rendering the provider with the context value and children
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};