import axios from "../Config/interceptors";
import { API_URL } from "../Config/config";

const URI = API_URL;

export function fetchPfaList() {
  return axios
    .get(`${URI}/Internship`)
    .then((r) => r.data.filter((pfa) => pfa.type === "PFA"));
}
export function getuniv(){
    return axios.get(`${URI}/univ/get/currentUnivYear`).then(r=>r.data)
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


export function getInternshipsByStudentId(){
    return axios.get(`${URI}/student/MyInternships`).then(r=>r.data.data)
}

export function createInternship(Internship){
    return axios.post(`${URI}/Internship`,Internship).then(r=>r.data)
}

export function getInternshipsByStudentIdAndType(type){
    return axios.get(`${URI}/student/MyInternbytype/${type}`).then(r=>r.data.data)
}

export function deleteInternship(id){
    return axios.delete(`${URI}/Internship/${id}`).then(r=>r.data)
}

export function GetAllPFE(){
    return axios.get(`${URI}/Internship/list/pfe`).then(r=>r.data.data)
}

export function GetMyPFE(){
    return axios.get(`${URI}/teacher/PFE`).then(r=>r.data)
}
export function GetPFEforPick() {
    return axios.get(`${URI}/internship/listpfe/forpick`).then((r) => r.data.data);
}

export function togglePFE(id){
    return axios.put(`${URI}/internship/PFE/togglePFE/${id}`).then(r=>r.data)
}

export function unpickPFE(id){
    return axios.put(`${URI}/internship/unpick/${id}`).then(r=>r.data)
}