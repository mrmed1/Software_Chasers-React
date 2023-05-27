import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import  { Calendar } from 'primereact/calendar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRef, useState} from "react";
import {signUp} from "../../Service/Service";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import toast, {Toaster} from "react-hot-toast";


const theme = createTheme();

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        if (allumni.password !== confirmedPassword) {
            toast.error('Les deux mots de passe ne correspondent pas.');

            return;
        }
        // Envoyer les données à backend
        // confirmed pwd
        signUp(allumni) .then((response)=>
        {
            toast.success('Votre demande de création de compte a été reçue');
            handleClearInputs();
            console.log("Sucscés Sign up affichage de page sign-Up.");

        })
            .catch((error)=>{
                toast.error('Il y a une erreur !');
                console.error("Une erreur s'est produite lors de sign-Up :", error);

            })
        console.log(allumni);

    };
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const navigate = useNavigate();
    const formRef = useRef(null);

    const [ allumni, setAllumni ] = useState({
        lastname: '',
        firstname: '',
        email: '',
        login: '',
        password: '',
        role: 'ALUMNI',
        level: '',
        class: '',
        dob: '',
        phone: '',
        isPublic: true,
        isValidate: 0,
        promotion:'',
        dog: '',
        doh :'',
    });
    const handleReturnHome= () => {
        navigate('/');
    };
    const handleConfirmedPassword = event => {
        console.log(event.target.value);
        setConfirmedPassword(event.target.value);
    };
    const handleClearInputs = () => {
        formRef.current.reset();
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Toaster/>
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
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Créer Compte Allumni
                    </Typography>
                    <Box component="form" ref={formRef}  onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/*nom*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-test="nom"
                                    required
                                    fullWidth
                                    id="nom"
                                    label="Nom"
                                    name="nom"
                                    autoComplete="family-name"
                                    onChange={(event) => setAllumni({ ...allumni, firstname: event.target.value })}
                                />
                            </Grid>
                            {/*prenom*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="prenom"
                                    data-test="prenom"
                                    required
                                    fullWidth
                                    id="prenom"
                                    label="Prénom"
                                    autoFocus
                                    onChange={(event) => setAllumni({ ...allumni, lastname: event.target.value })}
                                />
                            </Grid>
                            {/*email*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    data-test="email"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(event) => setAllumni({ ...allumni, email: event.target.value })}
                                />
                            </Grid>
                            {/*phone*/}
                            <Grid item xs={12} >
                                <TextField
                                    data-test="phone"
                                    name="phone"
                                    required
                                    fullWidth
                                    type="text"
                                    id="phone"
                                    label="N°Téléphone"
                                    autoFocus
                                    onChange={(event) => setAllumni({ ...allumni, phone: event.target.value })}
                                />
                            </Grid>
                            {/*date of birth*/}
                            <Grid item xs={12} >
                                <Calendar
                                    data-test="dob"
                                    style={{width :'100%'}}
                                    required
                                    placeholder="Date de naissance"
                                    showIcon
                                    name="dob"
                                    id="dob"
                                    onChange={(event) => setAllumni({ ...allumni, dob: event.value })}
                                />

                            </Grid>
                            {/*login*/}
                            <Grid item xs={12}>
                                <TextField
                                    data-test="login"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Login"
                                    name="login"
                                    type="text"
                                    onChange={(event) => setAllumni({ ...allumni, login: event.target.value })}

                                />
                            </Grid>
                            {/*pwd*/}
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    data-test="pwd"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(event) => setAllumni({ ...allumni, password: event.target.value })}
                                />
                            </Grid>
                            {/*confirmed pwd */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmedPassword"
                                    label="Confirmer PWD"
                                    type="password"
                                    id="confirmedPassword"
                                    autoComplete="new-password"
                                    onChange={handleConfirmedPassword}
                                />
                            </Grid>
                            {/*level*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="level"
                                    data-test="level"
                                    required
                                    fullWidth
                                    type="text"
                                    id="level"
                                    label="Dernier Niveau"
                                    autoFocus
                                    placeholder={"ex: 3"}
                                    onChange={(event) => setAllumni({ ...allumni, level: event.target.value })}
                                />
                            </Grid>
                            {/*class*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="class"
                                    data-test="class"
                                    id="class"
                                    required
                                    fullWidth
                                    type="text"
                                    label="Spécification"
                                    autoFocus
                                    placeholder={"ex: Cycle d'ingénieur informatique "}
                                    onChange={(event) => setAllumni({ ...allumni, class: event.target.value })}

                                />
                            </Grid>
                            {/*promotion*/}
                            <Grid item xs={12} >
                                <TextField
                                    data-test="promotion"
                                    name="promotion"
                                    required
                                    fullWidth
                                    type="text"
                                    id="promotion"
                                    label="Promotion"
                                    placeholder={"ex: 2018"}
                                    autoFocus
                                    onChange={(event) => setAllumni({ ...allumni, promotion: event.target.value })}
                                />
                            </Grid>
                            {/*do gradution*/}
                            <Grid item xs={12} >
                                <Calendar
                                    name="dog"
                                    data-test="dog"
                                    id="doh"
                                    style={{width :'100%'}}
                                    required
                                    placeholder="Date de l'obtention du diplôme "
                                    onChange={(event) => setAllumni({ ...allumni, dog: event.value })}
                                    showIcon
                                    autoFocus
                                />

                            </Grid>
                            {/*do hire*/}
                            <Grid item xs={12} >
                                <Calendar

                                    name="doh"
                                    data-test="doh"
                                    id="doh"
                                    style={{width :'100%'}}
                                    required={false}
                                    placeholder="Date de 1ère embauche"
                                    showIcon
                                    onChange={(event) => setAllumni({ ...allumni, doh: event.target })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            data-test="send"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Envoyer
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    data-test="cancel"
                                    onClick={handleReturnHome} underline="hover" variant="body2">
                                    Vous avez déjà un compte? S'identifier
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}