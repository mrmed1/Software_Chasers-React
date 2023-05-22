import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';

const Excel = () => {
        const handleFileChange = (event) => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M3MWZmZDZhMTY3MGY0NmRlYjc5NmYiLCJyb2xlIjoiVEVBQ0hFUiIsImlzUmVzcG9uc2libGUiOmZhbHNlLCJpYXQiOjE2ODQ3OTMwNTl9._g82w5u9w54cO1fk6ntZxqWt-lO8ozbNWdX1DXX189c'; // Remplacez par votre propre jeton d'accès

            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
                
            axios.post('https://school.eastus.cloudapp.azure.com/api/dg/importStudent', formData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
              .then(response => {
                // Traitement de la réponse de l'API
                console.log(response.data);
                //toast.success('Importation réussie !');
              })
              .catch(error => {
                // Gestion des erreurs
                console.error(error);
               // toast.error("Une erreur s'est produite lors de l'importation.");
              });
          };
        
          return (
            <Container maxWidth="sm">
              <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Importation d'étudiants
                </Typography>
                <label htmlFor="fileInput">
                  <input
                    id="fileInput"
                    type="file"
                    accept=".xlsx"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Button variant="contained" component="span" startIcon={<CloudUpload />}>
                    Sélectionner un fichier
                  </Button>
                </label>
              </Box>
            </Container>
          );
        };

        

    export default Excel;