import axios from  '../Config/interceptors';
import { API_URL } from "../Config/config";




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