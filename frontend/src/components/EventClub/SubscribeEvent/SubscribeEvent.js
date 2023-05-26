import * as React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
//import Autocomplete from "@mui/material/Autocomplete";
//import {  Dropdown,} from "semantic-ui-react";

//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
//import { addEventClub } from "../../../Service/Servicesubevent";
import * as api from "../../../Service/EventService/EventService";
//import { UniversityList } from "../../../Helpers/helper";

const theme = createTheme();

export default function SubscribeEvent(data) {
 
  const [FirstName, setFirstName] = useState(data.firstName);
  const [LastName, setLastName] = useState(data.lastName);
  const [Email, setEmail] = useState(data.email);
  const [Phone, setPhone] = useState(data.phone);
  const [Establishment, setEstablishment] = useState(data.establishment);
   
  const navigate = useNavigate();

/*   const { isLoading, isError, data } = useEventClub();
 //---------------------------------------------------------
 const createsubscribeMutation = useMutation((newInscrit) => {
  return addEventClub(newInscrit);
}, { 
  onSuccess: () => {
    
      
      
      toast.success(' Success');
      setnewInscrit({
        lastName: "",
        firstName: "",
        email: "",
        establishment: "",
        phone: "",
      });
  }, onError: (error) => {
      toast.error('!!!! Something went wrong ', error);
  }
});
if (isLoading) {
  return <div>Loading...</div>;
}

if (isError) {
  return <div>Error: {error.message}</div>;
} */


  // const [UniversityEventList, setUniversityEventList] =useState(data);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phone: data.get("phone"),
      university: data.get("establishment"),
    });
 
    const Subscribe = {
      lastName: LastName,
      firstName: FirstName,
      email: Email,
      establishment: Establishment,
      phone: Phone,
      univId: "",
    };
    axios.put(
      "https://school.eastus.cloudapp.azure.com/api/EventClub/" + data._id,
      Subscribe
    ).then((r)=>{
      toast.success("Club Updated Successfully")
      console.log(r.data)
      window.location.reload()
      
      
    })
   
    
}


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
            <AssignmentIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Subscribe
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setFirstName(event.target.value )} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="
                  establishment"
                  label="
                  establishment"
                  type="
                  establishment"
                  id="
                  establishment"
                  autoComplete="
                  establishment"
                  placeholder={"ex: ISAMM "}
                  onChange={(e) => setEstablishment(e.target.value)}
                />

                {/* <Dropdown
                  style={{ textAlign: "center" }}
                  placeholder="Add more Skills Here"
                  multiple
                  floating
                  search
                  selection
                  onChange={handleDropdownChange}
                  options={UniversityList}
                  required
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  type="text"
                  id="phone"
                  label="N°Téléphone"
                  autoFocus
                  onChange={(event) => setPhone( event.target.value )}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
