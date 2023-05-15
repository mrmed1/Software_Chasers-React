import React, { useState, useEffect } from "react";
import {
  Header,
  Image,
  Modal,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { Checkbox, Form } from "semantic-ui-react";
import * as api2 from "../../Service/PerosnService";
import "./EditClub.css";
import {Button} from "primereact/button";
import moment from "moment/moment";
import axios from "axios";
import {toast} from "react-hot-toast"

function EditClub({ data }) {
  const [open, setOpen] = React.useState(false);
  const [PersonsStudent, setPersonsStudent] = useState([]);
  const [PersonsTeachers, setPersonsTeachers] = useState([]);
  
  //states
  const [nameClub, setNameClub] = useState(data.name);

  const [foundation, setFoundation] = useState(moment(data.dac).format("YYYY-MM-DD"));
  const [Members, setMembers] = useState(data.members);
  const [updatedResponsible, setUpdatedResponsible] = useState(
    data.responsible._id
  );
  const [updatedPresident, setUpdatedPresident] = useState(data.president._id);
  

 
  
  //const handleNameChange = (event, data) => {setName(data.value);};

  const handleDropdownChange = (event, data) => {
    setMembers(data.value);
  };
  const handleResponsibleChange = (event, { value }) => {
    setUpdatedResponsible(value);
  };
  const handlePresidentChange = (event, { value }) => {
    setUpdatedPresident(value);
  };

  
  useEffect(() => {
    async function getAllStudents() {
      try {
        const res1 = await api2.getAllStudentsV2();
        setPersonsStudent(res1);
      } catch (e) {
        console.log(e);
      }
    }
    getAllStudents();
  }, []);

  ///state

  useEffect(() => {
    async function getAllTeachers() {
      try {
        const res = await api2.getAllTeachersV2();
        setPersonsTeachers(res);
      } catch (e) {
        console.log(e);
      }
    }
    getAllTeachers();
  }, []);

  function handleSubmit(e){
    e.preventDefault();

    const Club = {
      name: nameClub,
      dac: foundation,
      members: Members,
      responsible: updatedResponsible,
      president: updatedPresident,
    };
    axios.put(
      "https://school.eastus.cloudapp.azure.com/api/Club/" + data._id,
      Club,api2.header()
    ).then((r)=>{
      toast.success("Club Updated Successfully")
      console.log(r.data)
      window.location.reload()
      
      
    })

    
   


    //call api 
  }
 /*  const handleSubmit = async ()) => {
    // Call API to update club data using data, updatedResponsible, updatedPresident and members
    
    /*     await api.updateClub(id, {
      
      name: name,
      dac: foundation,
      members:members,
      responsible: responsible,
      president : president,
    }); */
  //
  const dateStr = data?.dac;
  const dateObj = moment(dateStr).format("YYYY-MM-DD");

  return (
    <Modal
      centered
      size="center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "25vh",
        background: "right",
        textAlignLast: "center",
        padding: "50px",
        marginLeft: "300px",
      }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={   <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-outlined p-button-info"
        ></Button>
        }
    >
      <Modal.Header>edit a club </Modal.Header>
      <Modal.Content>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Name</label>
            <Form.Input
              // defaultValue={data.name}
              autoFocus
              id="name"
              type="text"
              fluid
              value={nameClub}
              onChange={(e)=>setNameClub(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Date</label>
            <Form.Input
              placeholder="Date "
              //id="date"
              // onChange={handleJobTypeChange}
              onChange={(e)=>setFoundation(e.target.value)}
              type="date"
              fluid
              value={foundation}
            />
          </Form.Field>
        </Form.Group>
        <Form.Select
          fluid
          options={PersonsTeachers.map((teacher) => ({
            key: teacher._id,
            text: `${teacher.firstname} ${teacher.lastname}`,
            value: teacher._id,
          }))}
          label="Responsible "
          //placeholder="job Type"
          onChange={handleResponsibleChange}
          required
          value={updatedResponsible}
        />
        <Form.Select
          fluid
          options={PersonsStudent?.map((student) => ({
            key: student._id,
            text: `${student.firstname} ${student.lastname}`,
            value: student._id,
          }))}
          label="President"
          onChange={handlePresidentChange}
          required
          value={data.president._id}
        />
        <Dropdown
          //placeholder="members"
          fluid
          search
          selection
          options={PersonsStudent.map((student) => ({
            key: student._id,
            text: `${student.firstname} ${student.lastname}`,
            value: student._id,
          }))}
          multiple
          onChange={handleDropdownChange}
          defaultValue={Members.map((member) => member._id)}
        />

        <Form.Button color="blue" type="submit" onClick={handleSubmit}>
          {" "}
          Submit
        </Form.Button>
      </Modal.Content>
    </Modal>
  );
}

export default EditClub;
