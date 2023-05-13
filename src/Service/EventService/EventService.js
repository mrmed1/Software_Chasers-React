import axios from "../../Config/interceptors";
import {API_URL} from "../../Config/config";

const URI =API_URL;

export const addEventClub = async (EventClub) => {

  console.log('before add'+EventClub)
  const result = await axios.post("https://school.eastus.cloudapp.azure.com/api/EventClub", EventClub)
  console.log(result.data)
  return result.data;
}

export const getAllEventClub = async () => {
    // await delay(500)
    const result = await axios.get(`https://school.eastus.cloudapp.azure.com/api/EventClub` )
    console.log(result.data)
    return result.data;
  }
/* 
  export const updateEventClub = async (id, EventClub) => {
    const result = await Axios.put(
      "https://school.eastus.cloudapp.azure.com/api/EventClub/" + id,
      Club,header()
    )
    return result.data
  }*/
 
  export const deleteEventClub = async (id) => {
    try {
      const response = await axios.delete(`https://school.eastus.cloudapp.azure.com/api/EventClub/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }} 
 