import axios from  '../Config/interceptors';
import { API_URL } from "../Config/config";
 
 
  

  export function addEventClub(EventClub) {
    console.log('before add'+EventClub)
    return axios.post(`${API_URL}/EventClub`, EventClub)
        .then(response => {
            return response.data;
        });
}
export function getAllEventClub( ) {
 
    return axios.get(`${API_URL}/EventClub`)
    
    .then(response => {
        return response.data;
    });
}

export function UpdateEventClub(EventClub) {
 
    return axios.put(`${API_URL}/EventClub/${id}`, EventClub)
        .then(response => {
            return response.data;
        });
}
 export const deleteEventClub = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/EventClub/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }




  export const getUniv = async () => {
    const result = await axios.get(`${API_URL}/univ/get/currentUnivYear`)
    console.log(result.data)
    return result.data;
  }