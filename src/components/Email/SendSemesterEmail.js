import React, { useEffect } from "react";
import axios from "axios";

const SendSemesterEmail= () => {

  useEffect(() => {
    const interval = setInterval(() => {
      axios.post("https://school.eastus.cloudapp.azure.com/api/student/sendMailsAfterSemester")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000); // envoyer l'email toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Envoyer automatiquement des emails toutes les 5 secondes</h1>
    </div>
  );
};

export default SendSemesterEmail;
