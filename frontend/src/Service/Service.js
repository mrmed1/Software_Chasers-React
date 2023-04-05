import axios from '../Helpers/interceptors';

export  function signUp(data) {

    console.log("date réçu to service:",data);
    const allumni = JSON.stringify(data);
    console.log("Allumni stringify au niveau de service :",allumni);

    return axios.post('/Persons', allumni)
            .then(response => {
                return response.data;
                console.log("sucées Sign up au niveau de service:",allumni);
            });
};




