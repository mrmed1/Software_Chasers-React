import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../Service/ClubService";
import axios from "axios";
import "./View.css";
//import { Button , Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import {Link,useNavigate} from 'react-router-dom'



function View() {
    console.log("helloooooo")
 const [clubs, setClubs] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id)
    getClubById(id);
  }, [id]);

  const getClubById = async (id) => {
   // const response = await api.getClubById(id);
   const response = await axios.get(` https://school.eastus.cloudapp.azure.com/api/Club/${id}`);
   if (response.status === 200){
    setClubs({ ...response.data[0]});

   }
  };

  return (
    <div style={{marginTop: "150px"}}>
        <div className="card">
            <h1>helooooooo</h1>
            <div className="card-header">

            <h1>club details{clubs.name}</h1>
            </div>
     
            <div className="container">
               <strong>ID:</strong>
               <span>{id}:</span>
               <br/>
               <br/>
               <strong>Name of the Club :</strong>
               <span>{clubs && clubs.name}:</span>
               <br/>
               <br/>
               <strong>Foundation Date:</strong>
               <span>{clubs &&clubs.foundation}:</span>
               <br/>
               <br/>
               <strong>President of the Club</strong>
               <span>{clubs &&clubs.president}:</span>
               <br/>
               <br/>
               <strong>Responsible of the Club:</strong>
               <span>{clubs &&clubs.responsible}:</span>
               <br/>
               <br/>
               <strong>Members of the Club:</strong>
               <span>{clubs &&clubs.members.join(", ")}</span>
               <br/>
               <br/>
               <Link to ="/">
                   <Button   variant="contained">Go Back</Button>
               </Link>  
               
         </div>
      </div>
   </div>
  );
};
export default View;