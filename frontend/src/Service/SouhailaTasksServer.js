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

export function GetAllDemandeEXPERTCONTRACT (id){

    return axios.get('/Demand')
        .then(response => {
            const allDemande = response.data;
            const   listFiltred =allDemande.filter(Demande => Demande.type === 'EXPERTCONTRACT');
            console.log(listFiltred);
            return  listFiltred;});
}

export const addOffre = async (offre) => {

    const result = await axios.post('/Offer', offre)
    return result.data;
}

export const getAllOffresCONSEIL = async () => {
    return axios.get('/Offer')
        .then(response => {
            const allOffer = response.data;
            const   listFiltred =allOffer.filter(Offer => Offer.type === 'CONSEIL');
            console.log(listFiltred);
            return  listFiltred;

        });
}
export const getAllOffresOPPORTUNITE = async () => {
    return axios.get('/Offer')
        .then(response => {
            const allOffer = response.data;
            const   listFiltred =allOffer.filter(Offer => Offer.type === 'OPPORTUNITE');
            console.log(listFiltred);
            return  listFiltred;

        });

}
export const getAllOffresEMPLOIOFFRE = async () => {
    return axios.get('/Offer')
        .then(response => {
            const allOffer = response.data;
            const   listFiltred =allOffer.filter(Offer => Offer.type === 'EMPLOIOFFRE');
            console.log(listFiltred);
            return  listFiltred;

        });
}


export const updateOffre = async (offer) => {
    const result = await axios.put(
        `${API_URL}/Offer/${offer._id}`,offer)
    return result.data
}

export const deleteOffre = async (id) => {
    try {
        //const response = await axios.delete('/Offer/}'+id);
        const response = await axios.delete(`${API_URL}/Offer/${id}`);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getOffreById = async (id) => {
    const result = await axios.get(
        `${API_URL}/Offer/${id}`
    );
    return result.data;
}

//console.log(connectedUser());

