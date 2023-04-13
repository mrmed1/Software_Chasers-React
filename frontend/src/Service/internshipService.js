import axios from "../Config/interceptors";
import { API_URL } from "../Config/config";

const URI = API_URL;

export function fetchPfaList() {
 return axios.get(`${URI}/Internship`).then((r) => r.data.filter((pfa) => pfa.type === "PFA"))

  
  
}
