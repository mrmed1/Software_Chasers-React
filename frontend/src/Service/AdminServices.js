import axios from "../Config/interceptors";
import {API_URL} from "../Config/config";

const URI =API_URL;
export const addAdmin = async (admin) => {
   
    admin.role='ADMIN';
    console.log(admin);
  const result = await axios.post(`${API_URL}/Persons`, admin)
  return result.data;
}

export const fetchAdmins = async () => {
    // await delay(500)
    const result = await axios.get(`${API_URL}/Persons`)

    return result.data.filter(person => person.role === 'ADMIN');
  }

  export const updateAdmin = async (id,admin) => {
    const result = await axios.put(
        `${API_URL}/Persons/${id}`,
        admin
    )
    return result.data
  }
 
  export const deleteAdmin = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/Persons/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  
  