import React, { Fragment, useEffect } from "react";
import * as api from "../../Service/ClubService";
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
/*import "bootstrap/dist/css/bootstrap.min.css";*/
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
 
import SeeClub from "./SeeClub";
import EditClub from "./EditClub";
import { Icon } from "semantic-ui-react";
import {Toaster, toast} from "react-hot-toast"
import {getAllClub} from "../../Service/ClubService";
function HomeClub() {

  const [clubs, setClubs] = useState([]);
/*
  const [editDialogOpen, setEditDialogOpen] = useState(false);
*/
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
/*
    setEditDialogOpen(true);
*/
  };


  const handleDelete = async (id) => {
    if (
      window.confirm("are you sure that you wanted to delete that Club record ")
    ) {
       
      const response = await api.deleteClub(id);
      if (response.status === 200) {
        toast.success("deleted successfully");



      setClubs([]);
     
       await getAllClub();
      
      }

      //setTimeout(()=>history.push('/'),50);
      //history("/");
      window.location.reload();
    }
  };

  return (
    <Fragment>
      <Toaster/>
     

      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>foundation</TableCell>
              <TableCell>members</TableCell>
              <TableCell>President</TableCell>
              <TableCell>responsible</TableCell>
              <TableCell>Banned</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clubs && clubs.length > 0
              ? clubs.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{new Date(item.dac).toLocaleDateString()}</TableCell>
                      <TableCell>{item.members.map((member) => { return member.lastname +' '+ member.firstname + ' '})}</TableCell>
                      <TableCell>{item.president?.lastname} {item.president?.firstname}</TableCell>
                      <TableCell>{item.responsible?.lastname} {item.responsible?.firstname}</TableCell>
                      <TableCell><Icon name="check circle" color={item.isBaned? "red":"green"}/></TableCell>
                      <TableRow>
                         
                         
                        
                        &nbsp;
                        <Button onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                        &nbsp;
                        <SeeClub data={item}/>
                        <EditClub data={item}/>
                          
                      </TableRow>
                    </TableRow>
                  );
                })
              : "no data available"}
          </TableBody>
        </Table>
        <br></br>
        <Link className="d-grid gap-2 " to="/create">
          <Button size="lg">create</Button>
        </Link>
      </div>
    </Fragment>
  );
}

export default HomeClub;
