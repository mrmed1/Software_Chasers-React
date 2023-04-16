import axios from "../Config/interceptors";
import { API_URL } from "../Config/config";

const URI = API_URL;

export function fetchPfaList() {
  return axios
    .get(`${URI}/Internship`)
    .then((r) => r.data.filter((pfa) => pfa.type === "PFA"));
}
export function getunivList(){
    return axios.get(`${URI}/Univ`).then(r=>r.data)
}


export function createPFA(pfa){
    return axios.post(`${URI}/Internship`,pfa).then(r=>r.data)
}

export function updatePFA(pfa){
    return axios.put(`${URI}/Internship/${pfa._id}`,pfa).then(r=>r.data)
}
export function deletePFA(pfa){
    return axios.delete(`${URI}/Internship/${pfa._id}`).then(r=>r.data)
}

export function publishPFA(pfa){
    return axios.put(`${URI}/teacher/PFA/Publishe/${pfa._id}`).then(r=>r.data)
}




//ADMIN
export function fetchPublishedPFA(){
    return axios.get(`${URI}/teacher/PFA/Published`).then(r=>r.data.data)
}

export function toogleValideResponsiblePFA(pfa){
    return axios.put(`${URI}/teacher/PFA/responsible/${pfa._id}`).then(r=>r.data)
}

