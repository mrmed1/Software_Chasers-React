import axios from "../Config/interceptors";
const jwt = require('react-jwt');

/*
const API_URL = 'https://school.eastus.cloudapp.azure.com/api/admin/change-password';
*/

export function getUserIdFromToken(token){
    const decodedToken =jwt.decodeToken(token);
    console.log('token decoded :',decodedToken._id);
    const userId = decodedToken._id;
    console.log(userId)
    return userId;
};

export async function changeUserPassword(token, currentPassword, newPassword) {
    const userId = getUserIdFromToken(token);
    const data = { currentPassword, newPassword, userId };
    try {
        const response = await axios.post('/admin/change-password', data);
        if (response.status === 200) {
            return 'Success';
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export  function signUp(data) {

    console.log("date réçu to service:",data);
    const allumni = JSON.stringify(data);
    console.log("Allumni stringify au niveau de service :",allumni);

    return axios.post('/Persons', allumni)
            .then(response => {
                return response.data;
            }); 
};

export  function suiviCompteAllumni(email) {
    console.log("data recçu :",email);
    const allumniEmail = {"email":email};
        return  axios.post('/student/isvalid', allumniEmail)
            .then(response =>{

                console.log("resultat Api:",response.data)
                return response.data;
            })
            .catch(error=>{
                if (error.response && error.response.status === 404){
                    throw new Error("Email n'existe pas !");
                }
                console.error(error);
            })


};


