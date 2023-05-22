import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../Config/config';

export const auth = async (login, password,type) => {
    try {
       // const response = await axios.post(`${API_URL}/auth`, 
       let response = await axios.post(`${API_URL}/auth`, 

        { login, password,type });
       // const token  = response.data;
        const token = response.data.token;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem("userId", response.data.userId);
        response = await axios.post(`${API_URL}/notification/subscribeToTopic`, {
            registrationToken: localStorage.getItem("notifToken"),
            topic: localStorage.getItem("userId"),
          });





          return token;
        } catch (error) {
          if (localStorage.getItem(TOKEN_KEY)) return;
          console.log(error);
          throw new Error(error.response.data);
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

export const connectedUser = () => {
    if (isLoggedIn()) {
        const token = getToken();

        return  JSON.parse(atob(token.split('.')[1]));


    }
    return null;
}
