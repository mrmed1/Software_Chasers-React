import Axios from "axios"
export const header = () => ({
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiRElSRUNURVVSIiwiaXNSZXNwb25zaWJsZSI6ZmFsc2UsImlhdCI6MTY4MDA2NzAzNH0.LasPK_EhErBM0Vi9ux1N5WVwfzRpQLOeSlSgPC-JA38`,
  },
})  
export const addEnseignant = async (enseignant) => {
   
    enseignant.role='TEACHER';
    console.log(enseignant);
  const result = await Axios.post("http://localhost:3000/api/persons", enseignant, header())
  return result.data;
}

export const fetchEnseignants = async () => {
    // await delay(500)
    const result = await Axios.get("http://localhost:3000/api/persons",header())
  
    return result.data.filter(person => person.role === 'TEACHER');
  }

  export const updateEnseignant = async (id,enseignant) => {
    const result = await Axios.put(
      "http://localhost:3000/api/persons/" + id,
      enseignant,header()
    )
    return result.data
  }
 
  export const deleteEnseignant = async (id) => {
    try {
      const response = await Axios.delete(`http://localhost:3000/api/persons/${id}`, header());

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  
  