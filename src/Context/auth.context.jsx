import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const getToken = () => localStorage.getItem('authToken');

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const removeToken = () => {
        localStorage.removeItem('authToken');
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            axios.get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((response) => {
                    const user = response.data;
                    setIsLoggedIn(true);
                    setUser(user);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoggedIn(false);
                    setIsLoading(true);
                    setUser(null);
                })
        } else {
            setIsLoggedIn(false);
            setIsLoading(true);
            setUser(null);
        }
    }

    const logOut = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, setUser, storeToken, authenticateUser, logOut, getToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };