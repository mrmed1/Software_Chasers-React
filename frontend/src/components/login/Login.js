import * as React from 'react';
import { useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {auth} from "../../Service/auth.service";
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';
import {Checkbox, FormControlLabel} from "@mui/material";
import {useQuery} from "react-query";
import {GetMyPFE} from "../../Service/internshipService";
import {getIdClub} from "../../Service/ClubService";

const theme = createTheme();
export default function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isclub, setIsClub] = useState(false);
    const navigate = useNavigate();
    var type ='';
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        setLoginError(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(false);
    };


    //const { data, isLoading, error } = useQuery("club", (id)=> getIdClub(id));


    const handleSubmit = () => {
        let hasError = false;

        if (!login) {
            setLoginError(true);
            hasError = true;
        }

        if (!password) {
            setPasswordError(true);
            hasError = true;
        }

        if (!hasError) {
            if(isclub)
            {
                type = "club"
            }else {
                type = "person"
            }

            auth(login, password,type)
                .then((response) => {
                    toast.success('Login Successful');
                    setTimeout(() => {
                        navigate('/students');
                        window.location.reload()
                    },1000)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(error.toString());
                });

        }
    };

    const handleChange = () => {
        setIsClub(!isclub);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <Toaster/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            name="login"
                            value={login}
                            onChange={handleLoginChange}
                            autoComplete="login"
                            autoFocus
                            error={loginError}
                            helperText={loginError ? 'Please enter a login' : ''}
                            onBlur={() => {
                                if (!login) {
                                    setLoginError(true);
                                }
                            }
                            }

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError}
                            helperText={passwordError ? 'Please enter a password' : ''}
                            onBlur={() => {
                                if (!password) {
                                    setPasswordError(true);
                                }
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value={isclub} onChange={handleChange} color="primary" />}
                            label="Sign in as Club"
                        />

                        <Button
                            type="button"
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );

}