import axios from '../Helpers/interceptors';

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


