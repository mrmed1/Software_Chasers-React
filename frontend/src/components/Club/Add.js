import {useEffect, useState} from "react";
//import { Button , Form } from "react-bootstrap";
import "./Add.css"
/*import "bootstrap/dist/css/bootstrap.min.css";*/
import {Link, useNavigate} from "react-router-dom";
import * as api from "../../Service/ClubService";
import * as api2 from "../../Service/PerosnService";
import {Button, TextField} from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";
import toast from "react-hot-toast";

function AddClub() {
    const today = new Date().toISOString().slice(0, 10);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [foundation, setFoundation] = useState(today);
    const [members, setMembers] = useState([]);
    const [president, setPresident] = useState("");
    const [responsible, setResponsible] = useState("");
    const [PersonsStudent, setPersonsStudent] = useState([]);
    const [PersonsTeachers, setPersonsTeachers] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState("");
    const [selectedPerson1, setSelectedPerson1] = useState("");
    const [PersonsStudentM, setPersonsStudentM] = useState([]);


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

    const handleChange = (event, value) => {

        setSelectedPerson(value.id);
    };
    const handleChange1 = (event, value) => {

        setSelectedPerson1(value.id);

    };


    const handleChangeM = async (event, value) => {

        const membersid = await value.map(person => {
            return person.id;
        })

        setMembers(membersid);
    };

    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email);

        const newData = await api.addClub({
            name: name,
            email: email,
            dac: foundation,
            members: members,
            responsible: selectedPerson,
            president: selectedPerson1,
        });
        toast.success("Check your email to confirm your account !")
        setTimeout(() => history('/HomeClub'), 1500)


    };

    return (

        <div className="Add" style={{
            backgroundColor: ""
        }}>

            <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                label="President email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Date"
                type="date"
                value={foundation}
                onChange={(e) => setFoundation(e.target.value)}
                fullWidth
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={PersonsTeachers}
                getOptionLabel={(option) => option?.label || ""}

                value={PersonsTeachers._id}
                onChange={handleChange}
                sx={{width: 300}}

                renderInput={(params) => <TextField {...params} label="Responsible"/>}


            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={PersonsStudent}
                getOptionLabel={(option) => option?.label || ""}
                value={PersonsStudent._id}

                onChange={handleChange1}
                sx={{width: 300}}

                renderInput={(params) => <TextField {...params} label="President"/>}


            />

            &nbsp;

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


                onChange={handleChangeM}
                renderInput={(params) => (
                    <TextField {...params} label="limitTags" placeholder="members"/>
                )}
                sx={{width: '500px'}}
            />

            <div>
                <Button variant="contained" onClick={(e) => handleSubmit(e)} type="submit">submit</Button>
                &nbsp;
                <Link to="/" className="btn btn-danger ml-2">
                    cancel{" "}
                </Link>
            </div>
        </div>
    );
}

export default AddClub;
