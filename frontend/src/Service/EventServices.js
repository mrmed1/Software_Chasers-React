import Axios from "axios"
export const header = () => ({
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiRElSRUNURVVSIiwiaXNSZXNwb25zaWJsZSI6ZmFsc2UsImlhdCI6MTY4MDA2NzAzNH0.LasPK_EhErBM0Vi9ux1N5WVwfzRpQLOeSlSgPC-JA38`,
  },
})  
export const addEvent = async (event) => {

  console.log('before add'+event)
  const result = await Axios.post("http://localhost:3000/api/event", event, header())
  console.log(result.data)
  return result.data;
}

export const fetchEvents = async () => {
    // await delay(500)
    const result = await Axios.get("http://localhost:3000/api/event/")
    console.log(result.data)
    return result.data;
  }

  export const updateEvent = async (id, event) => {
    const result = await Axios.put(
      "http://localhost:3000/api/event/" + id,
      event,header()
    )
    return result.data
  }
 
  export const deleteEvent = async (id) => {
    try {
      const response = await Axios.delete(`http://localhost:3000/api/event/${id}`, header());
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  export const getUniv = async () => {
    const result = await Axios.get("http://localhost:3000/api/univ/get/currentUnivYear", header())
    console.log(result.data)
    return result.data;
  }
  
  