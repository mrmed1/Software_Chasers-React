import Axios from "axios"
export const header = () => ({
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJiNjM4YjgxZTRkNGFhNDJiMDVhZGEiLCJyb2xlIjoiQ0xVQiIsImlhdCI6MTY4MDU2NTE4OX0.KTMqstXUiarUGaiSfglATY_3W8lOhfokkL7fzxSHTEw",
  },
 /*  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiQURNSU4iLCJpc1Jlc3BvbnNpYmxlIjpmYWxzZSwiaWF0IjoxNjgwMjIwNTMxfQ._TT9uxZKFyZ5OGre4jzYh3IkfW2wWLi4BcB7z919-ZY",
  }, */
})  
export const addEventClub = async (EventClub) => {

  console.log('before add'+EventClub)
  const result = await Axios.post("https://school.eastus.cloudapp.azure.com/api/EventClub", EventClub, header())
  console.log(result.data)
  return result.data;
}

export const getAllEventClub = async () => {
    // await delay(500)
    const result = await Axios.get(`https://school.eastus.cloudapp.azure.com/api/EventClub` )
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
      const response = await Axios.delete(`https://school.eastus.cloudapp.azure.com/api/Club/${id}` , header());
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }} 
 