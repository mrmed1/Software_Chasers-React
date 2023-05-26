
import axios from "../Config/interceptors";
import {API_URL} from "../Config/config";

const URI =API_URL;
 
export const addEvent = async (event) => {

  console.log('before add'+event)
  const result = await axios.post(`${API_URL}/Event`, event)
  console.log(result.data)
  return result.data;
}

export const fetchEvents = async () => {
    // await delay(500)
    const result = await axios.get(`${API_URL}/Event`)
    console.log(result.data)
    return result.data;
  }

  export const updateEvent = async (id, event) => {
    const result = await axios.put(
        `${API_URL}/Event/${id}`,
      event
    )
    return result.data
  }
 
  export const deleteEvent = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/Event/${id}`);
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
  
  