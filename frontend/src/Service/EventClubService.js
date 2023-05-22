import axios from "../Config/interceptors";
import {API_URL} from "../Config/config";

const URI =API_URL;

 

export const getAllEventClub = async () => {
    // await delay(500)
    const result = await axios.get(`${API_URL}/EventClub/` )
    console.log(result.data)
    return result.data;
  }
  export const getEventClubById = async (id) => {
    try {console.log("result.data")
      const result = await axios.get(`${API_URL}/eventsClub/MyEvents`);
      console.log(result.data.data)
      return result.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
 
  export const updateEventClub = async (id, EventClub) => {
    const result = await axios.put(
      `${API_URL}/EventClub/${id}`,
      EventClub
    )
    return result.data
  } 
 
  export const deleteEventClub = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/EventClub/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }} 
 