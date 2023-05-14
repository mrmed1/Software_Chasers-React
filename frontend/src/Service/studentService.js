
import axios from "../Config/interceptors";
import {API_URL} from "../Config/config";

const URI =API_URL;

// added by me to search task
export async function getCvByIdOfOwner(id) {
    console.log('idddddd',id)
    const cvs = await axios.get(`${URI}/cv/`);
    const allCvs = cvs.data;
    let cvFound = {};
  
    allCvs.forEach((cv) => {
      if (cv.Owner === id) {
        console.log("Test is true");
        console.log(cv);
        cvFound = cv;
        console.log(cvFound);
      }
    });
  
    console.log(cvFound);
    return cvFound;
  }
  

export function getcV  (){
    return axios.get(`${URI}/student/cv`).then((r)=>r.data)
}

export function getAcount(id){
    return axios.get(`${URI}/Persons/${id}`).then((r)=>r.data)
}

export function updateProfile (Account){
    return axios.put(`${URI}/Persons/${Account._id}`,Account).then((r)=>r.data)
}
export function updateVisibility(id){
    return axios.put(`${URI}/student/visibility/${id}`).then((r)=>r.data)
}



//Adding !!
export function addSkills(Skills,id){
    return axios.post(`${URI}/student/Skills/${id}`,Skills).then((r)=>r.data.data)
}
export function addExperience (Experience,id){
    return axios.post(`${URI}/student/Experience/${id}`,Experience).then((r)=>r.data.data)
}

export function addEducation(Education,id){
    return axios.post(`${URI}/student/Education/${id}`,Education).then((r)=>r.data.data)
}
//Updating !!

export function updateEducation(Education,id){
    return axios.put(`${URI}/student/Education/${id}/${Education._id}`,Education).then((r)=>r.data.data)
}

export function updateExperience(Experience,id){
    return axios.put(`${URI}/student/Experience/${id}/${Experience._id}`,Experience).then((r)=>r.data.data)
}

export function toggleStyleCv(){
    return axios.put(`${URI}/student/toggleStyle`).then((r)=>r.data)
}




// Deleting !!!
export function deleteEducation(Education,id){
    return axios.delete(`${URI}/student/Education/${id}/${Education._id}`).then((r)=>r.data)
}
export function deleteExperience(Experience,id){
    return axios.delete(`${URI}/student/Experience/${id}/${Experience._id}`).then((r)=>r.data)
}

export function deleteSkills(Skills,id){
    return axios.delete(`${URI}/student/Skills/${id}/${Skills}`).then((r)=>r.data)
}

//Get PFA list validated 
export function fetchValidatedResponsablePFA(){
    return axios.get(`${URI}/teacher/PFA/validated`).then(r=>r.data)
}

//pick PFA
export function tooglePickedPFA(pfa,studentsId){
    return axios.put(`${URI}/student/PFA/togglePFA/${pfa._id}`,{studentsId}).then(r=>r.data)
}

//update Person with the same pswd
export function updateClass (Account){
    return axios.put(`${URI}/student/Persons/${Account._id}`,Account).then((r)=>r.data)
}