import axios from  '../Config/interceptors';
import { API_URL } from "../Config/config";

export function GetAlumnisWaiting() {

    return axios.get(`${API_URL}/Persons`)
        .then(response => {
                const allAlumnis = response.data;
             const   listFiltred =allAlumnis.filter(person => person.role === 'ALUMNI'&& person.isValidate === 0);
                console.log(listFiltred);
            return  listFiltred;

        });
}
export function GetAlumnisRejected (){

    return axios.get(`${API_URL}/Persons`)
        .then(response => {
            const allAlumnis = response.data;
            const   listFiltred =allAlumnis.filter(person => person.role === 'ALUMNI'&& person.isValidate === 2);
            console.log(listFiltred);
            return  listFiltred;

        });
}

export function GetAlumnisAccepted (){

    return axios.get(`${API_URL}/Persons`)
        .then(response => {
            const allAlumnis = response.data;
            const   listFiltred =allAlumnis.filter(person => person.role === 'ALUMNI'&& person.isValidate === 1);
            console.log(listFiltred);
            return  listFiltred;

        });
}

export function ValiderCompteAlumni(alumni) {
    const { _id, ...alumniData } = alumni;
    return axios.put(`${API_URL}/Persons/${alumni._id}`, alumniData)
        .then(response => {
            return response.data;
        });
}