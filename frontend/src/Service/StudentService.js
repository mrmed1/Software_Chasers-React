import Axios from "axios"
export const header = () => ({
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiQURNSU4iLCJpc1Jlc3BvbnNpYmxlIjpmYWxzZSwiaWF0IjoxNjgwMjIwNTMxfQ._TT9uxZKFyZ5OGre4jzYh3IkfW2wWLi4BcB7z919-ZY",
    },
  }) 
  export const getAllStudents = async () => {
    // await delay(500)
    const result1 = await Axios.get("https://school.eastus.cloudapp.azure.com/api/Persons",header())
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
    // return  allPersons.filter(person => person.role === 'STUDENT');