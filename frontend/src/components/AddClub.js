import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
 
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as api from "../Service/ClubService";
import * as api2 from "../Service/PerosnService";



const EditEventDialog = ({ open, onClose, selectedEditEvent }) => {
  const today = new Date().toISOString().slice(0, 10);

  const [name, setName] = useState(selectedEditEvent.name);
  const [foundation, setFoundation] = useState(selectedEditEvent.dac);
  const [members, setMembers] = useState(selectedEditEvent.members);
  const [president, setPresident] = useState(selectedEditEvent.president);
  const [responsible, setResponsible] = useState(selectedEditEvent.responsible);
  const [PersonsStudent, setPersonsStudent] = useState([]);
  const [PersonsTeachers, setPersonsTeachers] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState({});
  const [selectedPerson1, setSelectedPerson1] = useState({});
  console.log(selectedEditEvent)

 /*  useEffect(() => {
    if (selectedEditEvent) {
      setName(selectedEditEvent.name);
      setFoundation(selectedEditEvent.foundation);
      setPresident(selectedEditEvent.foundation);
      setResponsible(selectedEditEvent.responsible);
      setMembers(selectedEditEvent.members);


    } else {
      setName("");
      setFoundation("");
      setPresident("");
      setResponsible("");
      setMembers([]);


    }
  }, [selectedEditEvent]); */



/*   useEffect(() => {
    
    async function getAllTeachers() {
      try {
        const res = await api2.getAllTeachers();
        setPersonsTeachers(res);
      } catch (e) {
        console.log(e);
      }
     
      
    }
    getAllTeachers();
  }, []);


  useEffect(() => {
    async function getAllStudents() {
      try {
        const res1 = await api2.getAllStudents();
        setPersonsStudent(res1);
      } catch (e) {
        console.log(e);
      }
     
      
    }
    getAllStudents();
  }, []);


  useEffect(() => {
    async function getAllStudents() {
      try {
        const res2 = await api2.getAllStudents();
        setPersonsStudentM(res2);
      } catch (e) {
        console.log(e);
      }
     
      
    }
    getAllStudents();
  }, []);

  const handleChange = (event , value) => {
    
    setSelectedPerson(value.id);
  };
  const handleChange1 = (event , value) => {
    
    setSelectedPerson1(value.id);
   
  };


  const handleChangeM = async (event , value) => {
    
    const membersid = await value.map(person => {
      return person.id;
    })
  
    setMembers(membersid);
  };









  const handleSave = () => {
  const updatedEvent = {
      ...selectedEditEvent,
      name,
      foundation,
      president,
      responsible,
      members: [],
    };

    updateEvent(updatedEvent._id,updatedEvent);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFoundationChange = (event) => {
    setFoundation(event.target.value);
  };

  const handlePresidentChange = (event) => {
    setPresident(event.target.value);
  };
 
  const handleResponsibleChange = (event) => {
    setResponsible(event.target.value);
  };
  const handleMembersChange = (event) => {
    setMembers(event.target.value);
  };



  const updateEvent= async(id,Club)=>{
    await api.updateClub(id,{
    
    name,
    foundation: foundation,
    members:members,
    responsible: selectedPerson,
    president : selectedPerson1,
  });
  
} */



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
/*           onChange={handleNameChange}
 */        />
        <TextField
          margin="dense"
          id="type"
          label="Type"
          type="date"
          fullWidth
          value={foundation}
/*           onChange={handleFoundationChange}*/  
       />
        

     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={PersonsTeachers}
      getOptionLabel={(option) => option?.label || ""}

      value={PersonsTeachers._id}
/*       onCanPlay={handleResponsibleChange}
 */      
      sx={{ width: 300 }}
      
      renderInput={(params) => <TextField {...params} label="Responsible" />}
     

    />

<Autocomplete
      disablePortal
      id="combo-box-demo"
      options={PersonsStudent}
      getOptionLabel={(option) => option?.label || ""}
      value={PersonsStudent._id}
/*      onChange={handlePresidentChange}
 */    
      sx={{ width: 300 }}
    
      renderInput={(params) => <TextField {...params} label="President" />}
      

    />
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={PersonsStudent}
      //options={PersonsStudentM.length ? PersonsStudentM : []}
     // getOptionLabel={(option) => option.label}
     getOptionLabel={(option) => option?.label || ""}
     defaultValue={[PersonsStudent]}
      value={PersonsStudent.label}


/*       onChange={handleMembersChange}
 */       renderInput={(params) => (
        <TextField {...params} label="members" placeholder="members" />
      )}
      sx={{ width: '500px' }}
    />

         
      </DialogContent>
      <DialogActions>
{/*         <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default EditEventDialog;
/********************************************************************************** */
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
 
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as api from "../Service/ClubService";
import * as api2 from "../Service/PerosnService";



  const today = new Date().toISOString().slice(0, 10);
  console.log(today)

  const changeformatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // return the original value if the date is invalid
        return dateString;
    } else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
};
  const date1 = new Date(selectedEditEvent['dac'])
  const [name, setName] = useState(selectedEditEvent.dac);
  const [foundation, setFoundation] = useState(today);
  const [members, setMembers] = useState(selectedEditEvent.members);
  const [president, setPresident] = useState(selectedEditEvent.president);
  const [responsible, setResponsible] = useState(selectedEditEvent.responsible);
  const [PersonsStudent, setPersonsStudent] = useState([]);
  const [PersonsTeachers, setPersonsTeachers] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState({});
  const [selectedPerson1, setSelectedPerson1] = useState({});
  console.log(selectedEditEvent)

  useEffect(() => {
    if (selectedEditEvent) {
     setName(changeformatDate(selectedEditEvent["dac"]));
   setFoundation(selectedEditEvent["dac"]);
      setPresident(selectedEditEvent.foundation);
      setResponsible(selectedEditEvent.responsible);
      setMembers(selectedEditEvent.members);
      console.log('selecte Edit ');
      console.log(foundation);
      console.log(name);


    } else {
      setName("");
      setFoundation("");
      setPresident("");
      setResponsible("");
      setMembers([]);


    }
  }, [selectedEditEvent]);



  useEffect(() => {
    
    async function getAllTeachers() {
      try {
        const res = await api2.getAllTeachers();
        setPersonsTeachers(res);
      } catch (e) {
        console.log(e);
      }
     
      
    }
    getAllTeachers();
  }, []);


  useEffect(() => {
    async function getAllStudents() {
      try {
        const res1 = await api2.getAllStudents();
        setPersonsStudent(res1);
      } catch (e) {
        console.log(e);
      }
     
      
    }
    getAllStudents();
  }, []);


  useEffect(() => {
    async function getAllStudents() {
      try {
        const res2 = await api2.getAllStudents();
        setPersonsStudentM(res2);
      } catch (e) {
        console.log(e);
      }
     
      
    }
    getAllStudents();
  }, []);

  const handleChange = (event , value) => {
    
    setSelectedPerson(value.id);
  };
  const handleChange1 = (event , value) => {
    
    setSelectedPerson1(value.id);
   
  };


  const handleChangeM = async (event , value) => {
    
    const membersid = await value.map(person => {
      return person.id;
    })
  
    setMembers(membersid);
  };









  const handleSave = () => {
  const updatedEvent = {
      ...selectedEditEvent,
      name,
      foundation,
      president,
      responsible,
      members: [],
    };

    updateEvent(updatedEvent._id,updatedEvent);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFoundationChange = (event) => {
    setFoundation(event.target.value);
  };

  const handlePresidentChange = (event) => {
    setPresident(event.target.value);
  };
 
  const handleResponsibleChange = (event) => {
    setResponsible(event.target.value);
  };
  const handleMembersChange = (event) => {
    setMembers(event.target.value);
  };



  const updateEvent= async(id,Club)=>{
    await api.updateClub(id,{
    
    name,
    foundation: foundation,
    members:members,
    responsible: selectedPerson,
    president : selectedPerson1,
  });
  
}



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />

        
        <TextField
  margin="dense"
  id="date"
  label="Date"
  type="date"
  fullWidth
  defaultValue={changeformatDate(selectedEditEvent.dac)}
/>
     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={PersonsTeachers}
      getOptionLabel={(option) => option?.label || ""}

      value={PersonsTeachers._id}
      onCanPlay={handleResponsibleChange}
      
      sx={{ width: 300 }}
      
      renderInput={(params) => <TextField {...params} label="Responsible" />}
     

    />

<Autocomplete
      disablePortal
      id="combo-box-demo"
      options={PersonsStudent}
      getOptionLabel={(option) => option?.label || ""}
      value={PersonsStudent._id}
     onChange={handlePresidentChange}
    
      sx={{ width: 300 }}
    
      renderInput={(params) => <TextField {...params} label="President" />}
      

    />
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={PersonsStudent}
      //options={PersonsStudentM.length ? PersonsStudentM : []}
     // getOptionLabel={(option) => option.label}
     getOptionLabel={(option) => option?.label || ""}
     defaultValue={[PersonsStudent]}
      value={PersonsStudent.label}


      onChange={handleMembersChange}
       renderInput={(params) => (
        <TextField {...params} label="members" placeholder="members" />
      )}
      sx={{ width: '500px' }}
    />

         
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );


