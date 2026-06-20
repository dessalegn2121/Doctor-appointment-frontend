import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'TEPI_JWT';
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add auth token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Handle token expiration
apiClient.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export default apiClient;
