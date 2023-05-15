import axios from  '../Config/interceptors';
import { API_URL } from "../Config/config";
export const addClub = async (Club) => {

  console.log('before add'+Club)
  const result = await axios.post("https://school.eastus.cloudapp.azure.com/api/Club", Club)
  console.log(result.data)
  return result.data;
}

export const getAllClub = async () => {
    // await delay(500)
    const result = await axios.get(`https://school.eastus.cloudapp.azure.com/api/Club` )
    console.log(result.data)
    return result.data;
  }
  
  export const getIdClub = async (id, Club) => {
    // await delay(500)
    const result = await axios.get(`https://school.eastus.cloudapp.azure.com/api/Club/` + id  )
    console.log(result.data)
    return result.data;
  }

  export const updateClub = async (id, Club) => {
    const result = await axios.put(
      "https://school.eastus.cloudapp.azure.com/api/Club/" + id,
      Club
    )
    return result.data
  }
 
  export const deleteClub = async (id) => {
    try {
      const response = await axios.delete(`https://school.eastus.cloudapp.azure.com/api/Club/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  export const SignalerClub = async (id,signal) => {
    try {
      const response = await axios.post(`${API_URL}/club/${id}/addSignal`,signal);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }