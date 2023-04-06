import React, { Fragment, useEffect } from "react";
import * as api from "../Service/ClubService";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
 
import SeeClub from "./SeeClub";
import EditClub from "./EditClub";
import { Icon } from "semantic-ui-react";
import {Toaster, toast} from "react-hot-toast"
function Home() {
  let history = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEditEntity, setSelectedEditEntity] = useState({});

  //fonction getby id trajaali persons 

  useEffect(() => {
    async function getAllClub() {
      try {
        const res = await api.getAllClub();
        setClubs(res);
        console.log("clubssssssss",clubs);
      } catch (e) {
        console.log(e);
      }
    }
    getAllClub();
  }, []);

 

  const handleEdit = (e) => {
    console.log("eeeeeeeeeeeeeeeeeeeeee",e)
    setSelectedEditEntity(e);
    console.log(selectedEditEntity)
    setEditDialogOpen(true);
  };
  const updateEntity = async (id, updateEntity) => {
    const response = await api.updateClub(id, updateEntity);
    setClubs(response.data);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("are you sure that you wanted to delete that Club record ")
    ) {
       
      const response = await api.deleteClub(id);
      if (response.status === 200) {
        toast.success("deleted successfully");



      setClubs([]);
     
       getAllClub();
      
      }

      //setTimeout(()=>history.push('/'),50);
      history("/");
      location.reload(true);
    }
  };

  





  /*  var index =Club.map(function(e){
            return e.id
        }).indexOf(id); */
  // Club.splice(index,1); //remove items from an array at a specific index position.

  return (
    <Fragment>
      <Toaster/>
     

      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>foundation</th>
              <th>members</th>
              <th>President</th>
              <th>responsible</th>
              <th>Banned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs && clubs.length > 0
              ? clubs.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{new Date(item.dac).toLocaleDateString()}</td>
                      <td>{item.members.map((member) => { return member.lastname +' '+ member.firstname + ' '})}</td>
                      <td>{item.president.lastname} {item.president.firstname}</td>
                      <td>{item.responsible.lastname} {item.responsible.firstname}</td>
                      <td><Icon name="check circle" color={item.isBaned? "red":"green"}/></td>
                      <td>
                         
                         
                        
                        &nbsp;
                        <Button onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                        &nbsp;
                        <SeeClub data={item}/>
                        <EditClub data={item}/>
                          
                      </td>
                    </tr>
                  );
                })
              : "no data available"}
          </tbody>
        </Table>
        <br></br>
        <Link className="d-grid gap-2 " to="/create">
          <Button size="lg">create</Button>
        </Link>
      </div>
    </Fragment>
  );
}

export default Home;
