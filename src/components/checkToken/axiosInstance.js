// src/axiosInstance.js
import axios from 'axios';
const localhost = process.env.REACT_APP_API_BACK_END;
const axiosInstance = axios.create({
    baseURL: `${localhost}api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.accessToken) {
            config.headers['Authorization'] = `Bearer ${currentUser.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;