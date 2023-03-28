import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../Config/config';

export const auth = async (login, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth`, { login, password });
        console.log(response.data)
        const token  = response.data;
        localStorage.setItem(TOKEN_KEY, token);

        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
    const token = getToken();
    return token !== null && token !== undefined;
};
