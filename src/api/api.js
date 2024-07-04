// src/api/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001' // Update the port as needed
});
// In api.js or wherever you configure axios
api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default api;