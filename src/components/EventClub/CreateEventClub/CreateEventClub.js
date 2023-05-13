import * as React from "react";
import { useState, useEffect } from "react";
import * as api from "../../../Service/EventService/EventService";
import { Link, useNavigate } from "react-router-dom";

import { v4 as uuid } from "uuid";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {/*   {new Date().getFullYear()} */}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function CreateEventClub() {
    const today = new Date().toISOString().slice(0, 10);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [domain, setDomain] = useState("");
    // const [date, setDate] = useState(today);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [numberOfPlaces, setNumberOfPlaces] = useState();
    const [link, setLink] = useState("");
    const [location, setLocation] = useState("");

    let history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        /* const data = new FormData(event.currentTarget);
        console.log({
          Name: data.get("name"),
          description: data.get("description"),
          domain: data.get("domain"),
          date: data.get("date"),
          nbPlace: data.get("nbPlace"),
          urlEvent: data.get("urlEvent"),
          location: data.get("location"),
        }); */
        console.log(
            name +
            description +
            domain +
            startDate +
            endDate +
            numberOfPlaces +
            link +
            location
        );

        try {
            const response = await api.addEventClub(
                {
                    name,
                    description: description,
                    domain,
                    startDate,
                    endDate,
                    numberOfPlaces,
                    link,
                    location,
                }
            );
            console.log("Event added successfully:", response);
            // redirect to the event page or clear the form fields
        } catch (error) {
            console.error("Failed to add event:", error);
        }

        const ids = uuid();
        let uniqueId = ids.slice(0, 100);

        history("/HomeEvent");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="160%" fullWidth>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/*  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Ajouter Evenement
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={(e) => handleSubmit(e)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Event Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    id="description"
                                    label="Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    multiline
                                    maxRows={100}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="domain"
                                    required
                                    fullWidth
                                    id="domain"
                                    label="Domain"
                                    onChange={(e) => setDomain(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    label="Registration start date"
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    label="Registration end date "
                                    type="date"
                                    id="endDate"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={endDate}
                                    required
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="numberOfPlaces"
                                    required
                                    fullWidth
                                    id="numberOfPlaces"
                                    label="Number of Places"
                                    onChange={(e) => setNumberOfPlaces(e.target.value)}
                                    autoFocus
                                    // autoComplete
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/*  <TextField
                  name="link"
                  required
                  fullWidth
                  onChange={(e) => setLink(e.target.value)}
                  id="link"
                  label="Event url"
                  autoFocus
                /> */}

                                <TextField
                                    label="Enter URL"
                                    variant="outlined"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    fullWidth
                                    required

                                    InputProps={{
                                        type: "url",
                                        inputProps: {
                                            pattern: "https://.+",
                                            title:
                                                "Please enter a valid URL starting with http:// or https://",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="location"
                                    required
                                    fullWidth
                                    onChange={(e) => setLocation(e.target.value)}
                                    id="location"
                                    label="Event Location"
                                    autoFocus
                                />
                            </Grid>
                            {/* <Grid item xs={12} >
                <TextField
                  name="clubId"
                  required
                  fullWidth
                  id="clubId"
                  label="Club ID"
                  //onChange={(e) => setCid(e.target.value)}
                  autoFocus
                />
              </Grid> */}
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                        >
                            Add Event
                        </Button>
                        &nbsp;
                        <Link to="/HomeEvent" className="btn btn-danger ml-2">
                            cancel{" "}
                        </Link>
                        <Grid container justifyContent="flex-end"></Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}