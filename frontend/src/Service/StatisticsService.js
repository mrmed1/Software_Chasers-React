import axios from  '../Config/interceptors';
import { API_URL } from "../Config/config";


export function GetStatisticsByTeacher() {

    return axios.get(`${API_URL}/Internship/statistics/teacher`)
        .then(response => {
               return response.data;
        });
}

export function GetStatisticsByCountry() {

    return axios.get(`${API_URL}/Internship/statistics/country`)
        .then(response => {
            return response.data;
        });
}

export function GetStatisticsByCompany() {

    return axios.get(`${API_URL}/Internship/statistics/company`)
        .then(response => {
            return response.data;
        });
}