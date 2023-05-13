import Axios from "axios"
import {API_URL} from "../Config/config";
export const header = () => ({
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiQURNSU4iLCJpc1Jlc3BvbnNpYmxlIjpmYWxzZSwiaWF0IjoxNjgwMjIwNTMxfQ._TT9uxZKFyZ5OGre4jzYh3IkfW2wWLi4BcB7z919-ZY",
  },
})  
export const getAllTeachers = async () => {
    // await delay(500)
    const result = await Axios.get(`${API_URL}/Persons`,header())
    console.log('teachers :'+result);
    const teachers=result.data.filter(person => person.role === 'TEACHER');
    const personsWithLabels = teachers.map(person => {
      const firstname = person?.firstname ?? '';
      const lastname = person?.lastname ?? '';
        return {
          label: `${person.firstname} ${person.lastname}`,
          id: person._id,
         
        };
       
      });
      return personsWithLabels;
   // return result.data.filter(person => person.role === 'TEACHER');
  }
 export const getAllStudents = async () => {
    // await delay(500)
    const result1 = await Axios.get(`${API_URL}/Persons`,header())
    console.log('Students :'+result1);
    const Students=result1.data.filter(person => person.role === 'STUDENT');
    const personsWithLabels = Students.map(person => {
        return {
          label: `${person.firstname} ${person.lastname}`,
          id: person._id,
         
        };
       
      });
      return personsWithLabels;

    } 
   
    

