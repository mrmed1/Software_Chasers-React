import React, { useState ,useEffect} from "react";
//import { Button, Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import Club from "./Club";
import {v4 as uuid} from "uuid";
import {Link,useNavigate} from 'react-router-dom'
import * as api from "../Service/ClubService";
import * as api2 from "../Service/PerosnService";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Edit() {
    const today = new Date().toISOString().slice(0, 10);
    const [name, setName] = useState("");
    const [foundation, setFoundation] = useState(today);
    const [members, setMembers] = useState([]);
    const [president, setPresident] = useState("");
    const [responsible, setResponsible] = useState("");
    const [PersonsStudent, setPersonsStudent] = useState([]);
    const [PersonsTeachers, setPersonsTeachers] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState({});
    const [selectedPerson1, setSelectedPerson1] = useState({});
    const [id, setId] = useState("");
    
    const [clubs, setClubs] = useState({

        name: "",
        dac: "foundation",
        members: [],
        responsible: "",
        president: ""
      });
      

    let history =useNavigate();

    useEffect(() => {
        fetchData();
      }, []);
      
      const fetchData = async () => {
        const response = await api.getAllClub(id);
        setClubs(response.data); //[0]
      };
      
    
    const handleChange = (event , value) => {
    
        setSelectedPerson(value.id);
      };
      const handleChange1 = (event , value) => {
        
        setSelectedPerson1(value.id);
       
      };
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setClubs((clubs) => ({
          ...clubs,
          [name]: value
        }));
      };
      
    const handleEdit  = async (e)=>{

        e.preventDefault();
        const response = await api.updateClub(id , data );
        setClubs(response.data);

        /* const updatedData = {
              id,
              name,
              dac: foundation,
              members:[...members],
              responsible: selectedPerson,
              president: selectedPerson1,
            };
            const response = await api.updateClub(updatedData.id, updatedData);
            if (response.status === 200) {
              Toast.success(`Club with id ${updatedData.id} has been updated successfully.`);
              history.push("/");
            } else {
              Toast.error("Failed to update club record.");
            } */
            
          

    
        history("/");


    }
/* useEffect(()=>{
    setName(localStorage.getItem('Name'))
    setFoundation(localStorage.getItem('Foundation'))
    setPresident(localStorage.getItem('President'))
    setResponsible(localStorage.getItem('Responsible'))
    setId(localStorage.getItem('Id'))

},[]) */
 
   

return (
     
    <div className="Add"  style={{
      backgroundColor: ""
  }}>
      
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        type="text"
        value={name}
        onChange={handleInputChange}
        //onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Date"
        type="date"
        value={foundation}
        onChange={handleInputChange}
        //onChange={(e) => setFoundation(e.target.value)}
        fullWidth
      />
      &nbsp;
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={PersonsTeachers}
      getOptionLabel={(option) => option?.label || ""}

      value={PersonsTeachers._id}
      onCanPlay={handleInputChange}
      //onChange={handleChange}
      sx={{ width: 300 }}
      
      renderInput={(params) => <TextField {...params} label="Responsible" />}
     

    />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={PersonsStudent}
      getOptionLabel={(option) => option?.label || ""}
      value={PersonsStudent._id}
     onChange={handleInputChange}
      //onChange={handleChange1}
      sx={{ width: 300 }}
    
      renderInput={(params) => <TextField {...params} label="President" />}
      

    /> 


      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Members</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={members}
            label="Members"
            onChange={handleInputChange}
           // onChange={(e) => setMembers(e.target.value)}
          >
            <MenuItem value="63a70d5bdb445d4c7ccff032">ahmed</MenuItem>
            <MenuItem value="63a70d5bdb445d4c7ccff032">louay</MenuItem>
            <MenuItem value="63a70d5bdb445d4c7ccff032">sami</MenuItem>
          </Select>
        </FormControl>
      </Box>
      &nbsp;
      &nbsp;
    
      <div>
        <Button   variant="contained"onClick={handleEdit}type="submit">submit</Button>
        &nbsp; &nbsp;
        <Link to="/" className="btn btn-danger ml-2">
          cancel{" "}
        </Link>
      </div>
    </div>
  );
}

export default Edit;









        /*     <div>
           
            <Form className="d-grid gap-2" style={{margin:"15rem"}}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter Name" value ={name} required onChange={(e)=> setName(e.target.value)}>

                    </Form.Control>

                </Form.Group>

            <Form.Group className="mb-3" controlId="formFoundation">
                    <Form.Control type="date" placeholder="Enter date" value ={foundation}required onChange={(e)=> setFoundation(e.target.value)}>

                    </Form.Control>

                </Form.Group> 

    
        <Form.Group className="mb-3" controlId="formPresident">
                    <Form.Control type="text" placeholder="Enter President Name" value ={president} required onChange={(e)=> setPresident(e.target.value)}>

                    </Form.Control>

                    

                </Form.Group>

                
                <Form.Group className="mb-3" controlId="formResponsible">
        <Form.Control type="text" placeholder="Enter the Responsible Name" value ={responsible} required onChange={(e)=> setResponsible(e.target.value)}>
            
        </Form.Control>
        </Form.Group>

                <Button onClick={(e)=>handleSubmit(e)} type ="submit">Update</Button>
            </Form>
        </div>
        )
 } */
