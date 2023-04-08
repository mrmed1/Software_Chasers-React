import Axios from "axios"
export const header = () => ({
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiQURNSU4iLCJpc1Jlc3BvbnNpYmxlIjpmYWxzZSwiaWF0IjoxNjgwMjIwNTMxfQ._TT9uxZKFyZ5OGre4jzYh3IkfW2wWLi4BcB7z919-ZY",
  },
})  
export const addClub = async (Club) => {

  console.log('before add'+Club)
  const result = await Axios.post("https://school.eastus.cloudapp.azure.com/api/Club", Club, header())
  console.log(result.data)
  return result.data;
}

export const getAllClub = async () => {
    // await delay(500)
    const result = await Axios.get(`https://school.eastus.cloudapp.azure.com/api/Club` )
    console.log(result.data)
    return result.data;
  }
  
  export const getIdClub = async (id, Club) => {
    // await delay(500)
    const result = await Axios.get(`https://school.eastus.cloudapp.azure.com/api/Club/` + id  )
    console.log(result.data)
    return result.data;
  }

  export const updateClub = async (id, Club) => {
    const result = await Axios.put(
      "https://school.eastus.cloudapp.azure.com/api/Club/" + id,
      Club,header()
    )
    return result.data
  }
 
  export const deleteClub = async (id) => {
    try {
      const response = await Axios.delete(`https://school.eastus.cloudapp.azure.com/api/Club/${id}` , header());
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
 