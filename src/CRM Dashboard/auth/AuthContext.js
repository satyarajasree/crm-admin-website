// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);

    // Helper function to calculate token expiration time
    const getTokenExpirationTime = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
        } catch (error) {
            return null;
        }
    };

    const logout = () => {
        setToken(null);
        Swal.fire({
            title:"Your logged out successfully"
          });
        localStorage.removeItem('jwtToken');
    };

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('jwtToken', newToken);

        // Automatically schedule logout when token expires
        const expirationTime = getTokenExpirationTime(newToken);
        console.log(token)
        if (expirationTime) {
            const timeout = expirationTime - Date.now(); // Calculate remaining time
            setTimeout(logout, timeout);
        }
    };

    // Check token expiration on component mount and schedule logout if valid
    useEffect(() => {
        if (token) {
            const expirationTime = getTokenExpirationTime(token);
            if (expirationTime && expirationTime > Date.now()) {
                const timeout = expirationTime - Date.now();
                setTimeout(logout, timeout);
            } else {
                // Token is already expired
                logout();
            }
        }
    }, [token]); // Runs when `token` changes

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
