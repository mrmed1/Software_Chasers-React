import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRef, useState} from "react";
import {changeUserPassword} from "../../Service/Service";
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";
import Typography from "@mui/material/Typography";

const theme = createTheme();

export default function UpdatePwd() {
    const handleSubmit = (event) => {
        event.preventDefault();

        if (newPassword !== confirmedPassword) {
            toast.error('Les deux mots de passe ne correspondent pas.');
            return ;

        }
        // Envoyer les données à backend ou
        console.log({currentPassword,newPassword,confirmedPassword});
        const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M3MjBiOWQ3NThjZmU2ZTkxY2NmNzEiLCJyb2xlIjoiU1RVREVOVCIsImlzUmVzcG9uc2libGUiOmZhbHNlLCJpYXQiOjE2ODA2NDUxMDR9.y4NK62jMWjGE-elN3EToqhf_JxZUD2MP3Nq8_IGhqoM'
        changeUserPassword(token,currentPassword,newPassword)
            .then((response)=>
            {
                toast.success('Le mot de passe a été modifié avec succès.');
                handleClearInputs();
                console.log("Le mot de passe a été modifié avec succès !");
            })
            .catch((error)=>{
                toast.error('Something wrong !');
                console.error("Une erreur s'est produite lors de la modification du mot de passe :", error);
            })              ;

        handleClearInputs();

    };
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleReturnHome= () => {
        navigate('/');
    };
    const handleCurrentPassword = event => {
        console.log(event.target.value);
        setCurrentPassword(event.target.value);
    };
    const handleNewPasswordChange = event => {
        console.log(event.target.value);
        setNewPassword(event.target.value);
    };
    const handleClearInputs = () => {
        formRef.current.reset();
    };
    const handleConfirmedPasswordChange = event => {
        console.log(event.target.value);

        setConfirmedPassword(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Toaster />
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockPersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Changer Mot de Passe
                    </Typography>
                    <Box component="form" ref={formRef} onSubmit={handleSubmit}  sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            //value={currentPassword}
                            name="current-password"
                            label="Mot de passe actuel"
                            type="password"
                            id="current-password"
                            onChange={handleCurrentPassword}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Nouveau mot de passe "
                            type="password"
                            id="password"
                          //  value={newPassword}
                            autoFocus
                            autoComplete="current-password"
                            onChange={handleNewPasswordChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmer le mot de passe"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            //value={confirmedPassword}
                            autoFocus
                            onChange={handleConfirmedPasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enregistrer
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link onClick={handleReturnHome} variant="body2" underline="hover">
                                    {"Retour"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


