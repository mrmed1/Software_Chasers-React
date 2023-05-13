import Axios from "axios"
 
import {API_URL} from "../Config/config";

const URI =API_URL;

 

export const header = () => ({
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiQURNSU4iLCJpc1Jlc3BvbnNpYmxlIjpmYWxzZSwiaWF0IjoxNjgwMjIwNTMxfQ._TT9uxZKFyZ5OGre4jzYh3IkfW2wWLi4BcB7z919-ZY",
  },
})  
export const addClub = async (Club) => {

  console.log('before add'+Club)
  const result = await Axios.post(`${API_URL}/Club`, Club, header())
  console.log(result.data)
  return result.data;
}

export const getAllClub = async () => {
    // await delay(500)
    const result = await Axios.get(`${API_URL}/Club` )
    console.log(result.data)
    return result.data;
  }
  
  export const getIdClub = async (id, Club) => {
    // await delay(500)
    const result = await Axios.get(`${API_URL}/Club` + id  )
    console.log(result.data)
    return result.data;
  }

  export const updateClub = async (id, Club) => {
    const result = await Axios.put(
      `${API_URL}/Club` + id,
      Club,header()
    )
    return result.data
  }
 
  export const deleteClub = async (id) => {
    try {
      const response = await Axios.delete(`${API_URL}/Club/${id}` , header());
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
 