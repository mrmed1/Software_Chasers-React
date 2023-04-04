import React, { Fragment, useEffect } from "react";
import * as api from "../Service/ClubService";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EditEventDialog from "./Edit";

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
        console.log(clubs);
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
      alert(id);
      const response = await api.deleteClub(id);
      if (response.status === 200) {
        Toast.success(response.clubs);
       // window.location.reload();
// Reload the current page from the server


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
      {selectedEditEntity && (
        <EditEventDialog
          open={editDialogOpen}
          onClose={() => {
            setEditDialogOpen(false);
          }}
          selectedEditEvent={selectedEditEntity}
          onSave={updateEntity}
        />
      )}

      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>foundation</th>
              <th>members</th>
              <th>President</th>
              <th>responsible</th>
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
                      <td>
                         
                          <Button
                            onClick={() =>
                              handleEdit(
                                item
                        
                              )
                            }
                          >
                            Edit
                          </Button>
                        
                        &nbsp;
                        <Button onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                        &nbsp;
                        <Link to={"/view"}>
                          {/* <Button onClick={()=> handleView(item._id, item.name, item.dac, item.members,item.president, item.responsible)}>view</Button> */}
                          <Button>view</Button>
                        </Link>
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
