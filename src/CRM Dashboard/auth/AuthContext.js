import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);
    const [username, setUsername] = useState(null);

    // Helper function to decode token and extract payload
    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    // Helper function to calculate token expiration time
    const getTokenExpirationTime = (token) => {
        const decoded = decodeToken(token);
        return decoded && decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
    };

    const logout = () => {
        setToken(null);
        setUsername(null); // Clear username on logout
        Swal.fire({
            title: "You have logged out successfully",
        });
        localStorage.removeItem('jwtToken');
    };

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('jwtToken', newToken);

        const decoded = decodeToken(newToken);
        console.log("Decoded Token:", decoded); // Log the entire decoded token for debugging
        if (decoded && decoded.sub) {
            setUsername(decoded.sub); // Extract username from the 'sub' field of the token
        }

        const expirationTime = getTokenExpirationTime(newToken);
        if (expirationTime) {
            const timeout = expirationTime - Date.now(); // Calculate remaining time
            setTimeout(logout, timeout);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            const decoded = decodeToken(storedToken);
            console.log("Decoded Token from localStorage:", decoded); // Log for debugging
            if (decoded && decoded.sub) {
                setUsername(decoded.sub); // Set username from 'sub' field
            }
            const expirationTime = getTokenExpirationTime(storedToken);
            if (expirationTime && expirationTime > Date.now()) {
                const timeout = expirationTime - Date.now();
                setTimeout(logout, timeout);
            } else {
                logout(); // Token is expired
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
