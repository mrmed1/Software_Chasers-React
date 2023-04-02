import axios from 'axios';


const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E2MDkwYzFhMDgzNGE1MWFjNTI0NmUiLCJyb2xlIjoiU1RVREVOVCIsImlzUmVzcG9uc2libGUiOmZhbHNlLCJpYXQiOjE2ODAwNDYxNTh9.aAU4puz-gXv3upqzNa6Ukr4Ze2knZoFyduj5Bg4LN9o"
// Set up default config for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor to refresh the token if expired
axios.interceptors.request.use(
    (config) => {
        // Add the Authorization header if token exists
        //const token = localStorage.getItem(TOKEN_KEY);
        if (TOKEN) {
            config.headers['Authorization'] = `Bearer ${TOKEN}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
