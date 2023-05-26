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

export const addUnivYear = async (univYear) => {
    const result = await axios.post(`${API_URL}/admin/addUnivYear`, univYear);
    return result.data;
  };
  
  export const deleteUnivYear = async (id) => {
    const result = await axios.delete(
      `${API_URL}/admin/deleteUnivYear/${id}`,
      {}
    );
    return result.data;
  };
  
  export const updateUnivYear = async (univYear) => {
    const result = await axios.put(`${API_URL}/admin/updateUnivYear`, univYear);
    return result.data;
  };
  
  export const fetchUnivYear = async () => {
    const result = await axios.get(`${API_URL}/admin/fetchUnivYear`);
    return result.data.univYears;
  };