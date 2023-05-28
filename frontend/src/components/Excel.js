import React, {useState} from 'react';

import { Button } from 'primereact/button';
import axios from 'axios';
import {TOKEN_KEY} from "../Config/config";
import ListEtudiant from "./CrudEtudiant/ListEtudiant";

const Excel = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('https://school.eastus.cloudapp.azure.com/api/dg/importStudent', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server
                setUploadResult(data);
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input type="file" onChange={handleFileChange} style={{ marginRight: '1rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                <Button onClick={handleUpload} >Upload</Button>
            </div>
        </div>
    );
}


export default Excel;


// axios.post('https://school.eastus.cloudapp.azure.com/api/dg/importStudent', formData, {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })
//   .then(response => {
//     // Traitement de la réponse de l'API
//     console.log(response.data);
//     //toast.success('Importation réussie !');
//   })
//   .catch(error => {
//     // Gestion des erreurs
//     console.error(error);
//    // toast.error("Une erreur s'est produite lors de l'importation.");
//   });