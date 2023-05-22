import axios from  '../Config/interceptors';
import { API_URL } from "../Config/config";
import { connectedUser } from "./auth.service";

const ROLE = connectedUser()?.role;

export function  GetAllPublicStudents() {
    
    console.log('allPersons  api call:'+`${API_URL}/Persons`);
    return  axios.get(`${API_URL}/Persons`)
        .then(response => {
            const allPersons = response.data;
            console.log('allPersons  data:'+response.data);
            if(ROLE=='TEACHER')
            {
                console.log('fetch as teacher' +allPersons.filter(person =>(( person.role === 'STUDENT'|| person.role === 'ALUMNI'))));
           
                return  allPersons.filter(person =>( person.role === 'STUDENT'|| person.role === 'ALUMNI'));
    
            }else if ((ROLE=='STUDENT')||(ROLE=='ALUMNI')){
                console.log('fetch as student'+allPersons.filter(person =>(( person.role === 'STUDENT'|| person.role === 'ALUMNI')&&person.isPublic)));
           
                return  allPersons.filter(person =>( person.role === 'STUDENT'|| person.role === 'ALUMNI')&&person.isPublic);
    
            }
            
        });
}



export function GetAllStudents() {

    return axios.get(`${API_URL}/Persons`)
        .then(response => {
            const allPersons = response.data;
            return  allPersons.filter(person => person.role === 'STUDENT');
        });
}



export function CreateStudent(student) {
    return axios.post(`${API_URL}/Persons`, student)
        .then(response => {
            return response.data;
        });
}

export function UpdateStudent(student) {
    const { _id, ...studentData } = student;
    return axios.put(`${API_URL}/Persons/${student._id}`, studentData)
        .then(response => {
            return response.data;
        });
}

export function DeleteStudent(id) {
    return axios.delete(`${API_URL}/Persons/${id}`)
        .then(response => {
            return response.data;
        });
}