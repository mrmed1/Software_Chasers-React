import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PolicyIcon from '@mui/icons-material/Policy';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {suiviCompteAllumni} from "../../Service/Service";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';


const theme = createTheme();

export default function UpdatePwd() {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
        handleButtonClick();
    };

    const [email, setEmail] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [buttonColor, setButtonColor] = useState("");
    const [buttonText, setButtonText] = useState("");
    const navigate = useNavigate();

    const handleReturnHome= () => {
        navigate('/');
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setShowButton(true);
        console.log(event.target.value);

    };

    const  handleButtonClick = () => {

        suiviCompteAllumni(email).then(etatCompte=>{
            console.log("Etat Compte :",etatCompte);
            const etat = parseInt(etatCompte);
            console.log(etat);
            if (etat === 0) {
                setButtonColor("blue");
                setButtonText("En cours...");
            }
            else if (etat === 1) {
                setButtonColor("green");
                setButtonText("Accepter");
            }
            else if (etat === 2) {
                setButtonColor("red");
                setButtonText("Refuser");
            }

        })
            .catch(error =>{
                console.error(error);
                setButtonColor("gray");
                setButtonText("Utilisateur n'existe pas");
            });

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        <PolicyIcon />
                    </Avatar>
                        <Typography component="h1" variant="h5">
                              Vérifier Etat Compte
                        </Typography>
                    <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="text"
                            id="email"
                            value={email}
                            autoFocus
                            onChange={handleEmail}
                        />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Suivre
                            </Button>

                        {buttonColor && (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: buttonColor }}                            >
                                {buttonText}
                            </Button>
                        )

                        }

                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link underline="hover" onClick={handleReturnHome} variant="body2" >
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

/*
* souhaila.aouaouri199777779@gmail.com =etat 0 (en cours...)
* souhaila.aouaouri@gmail.com = etat 1 (Accepter)
* souhaila@gmail.com = etat 2 (Refuser)

 */
