import Container from "@mui/material/Container";
import toast, {Toaster} from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useRef, useState } from "react";
import {SendRequestVacations} from "../../Service/SouhailaTasksServer";
import {connectedUser} from "../../Service/auth.service";

export default function DemandeVacation() {
    const formRef = useRef(null);
    const user_id = connectedUser()._id;
    const [demande, setDemande] = useState({
        title: "Demande de Vacation",
        description: "",
        lesson_name: "",
        owner: user_id,
        type: "VACATION",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        //toast.error('Les deux mots de passe ne correspondent pas.');
        console.log(demande);
        SendRequestVacations(demande).then((res) => {
            console.log(res);
                toast.success("Request Vacation sent successfully");
                handleClearInputs();

        }).catch((error) => {
            console.log(error);
            toast.error("Request Vacation failed");
        });

    };

    const handleClearInputs = () => {
        formRef.current.reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Toaster />
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <InsertDriveFileIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Request Vacations
                </Typography>
                <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/*lesson */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="lesson"
                                label="Lesson Name"
                                name="lesson"
                                autoComplete="lesson"
                                onChange={(event) =>
                                    setDemande({ ...demande, lesson_name: event.target.value })
                                }
                            />
                        </Grid>
                        {/*description*/}
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="description"
                                name="description"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                autoFocus
                                onChange={(event) =>
                                    setDemande({ ...demande, description: event.target.value })
                                }
                            />
                        </Grid>
                        {/*Buttons*/}
                        <Grid item xs={12} container justifyContent="space-between">
                            <Grid item xs={6}>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Envoyer
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleClearInputs} fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'red', marginLeft: '1rem' }}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
