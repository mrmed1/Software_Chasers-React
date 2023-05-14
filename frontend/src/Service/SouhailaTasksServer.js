import axios from "axios";
import {API_URL} from "../Config/config";


export  function SendRequestVacations (data) {

    console.log("date réçu to service:",data);
    const demande = JSON.stringify(data);

    return axios.post('/Demand', demande)
        .then(response => {
            console.log("response from server:",response.data);
            return response.data;
        });
};

export function GetAllDemandeVacation() {

    return axios.get('/Demand')
        .then(response => {
            const allDemande = response.data;
            const   listFiltred =allDemande.filter(Demande => Demande.type === 'VACATION');
            console.log(listFiltred);
            return  listFiltred;

        });

}

export function getOwner (id){
    return axios
        .get('/Persons/'+id)
        .then(response => {
            const user = response.data;
            console.log(user);
            return user;
        })
        .catch(error => {
            console.error("Error fetching owner data:", error);
            throw error;
        });
}