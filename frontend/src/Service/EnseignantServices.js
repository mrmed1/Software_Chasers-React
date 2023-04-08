import axios from "../Config/interceptors";
import {API_URL} from "../Config/config";

const URI =API_URL;
export const addEnseignant = async (enseignant) => {
   
    enseignant.role='TEACHER';
    console.log(enseignant);
  const result = await axios.post(`${API_URL}/Persons`, enseignant)
  return result.data;
}

export const fetchEnseignants = async () => {
    // await delay(500)
    const result = await axios.get(`${API_URL}/Persons`)
  
    return result.data.filter(person => person.role === 'TEACHER');
  }

  export const updateEnseignant = async (id,enseignant) => {
    const result = await axios.put(
        `${API_URL}/Persons/${id}`,
      enseignant
    )
    return result.data
  }
 
  export const deleteEnseignant = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/Persons/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  
  