// src/api/axios.js
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from './Api';

const useAxios = () => {
    const { token } = useAuth();

    const instance = axios.create({
        baseURL: `${API_BASE_URL}`, 
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
