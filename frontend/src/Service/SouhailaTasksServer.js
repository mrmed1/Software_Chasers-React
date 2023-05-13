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