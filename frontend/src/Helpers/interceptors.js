import axios from 'axios';
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M3MjBiOWQ3NThjZmU2ZTkxY2NmNzEiLCJyb2xlIjoiU1RVREVOVCIsImlzUmVzcG9uc2libGUiOmZhbHNlLCJpYXQiOjE2ODA2NDUxMDR9.y4NK62jMWjGE-elN3EToqhf_JxZUD2MP3Nq8_IGhqoM'
const API_URL = 'https://school.eastus.cloudapp.azure.com/api';

// Set up default config for axios
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor to refresh the token if expired
axios.interceptors.request.use(
    (config) => {
        // Add the Authorization header if token exists
        if (token) {
            config.headers['Authorization'] = 'Bearer '+token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
