// src/api/axios.js
import axios from 'axios';
import { useAuth } from './AuthContext';


const useAxios = () => {
    const { token } = useAuth();

    const instance = axios.create({
        baseURL: 'https://crm-java.onrender.com', // Replace with your backend URL
    });

    instance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};

export default useAxios;
