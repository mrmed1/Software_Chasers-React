import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
export default function Home (){
    const navigate = useNavigate();
    const handleChangePwdClick = () => {
        navigate('/PwdUpdate');
    };


    const buttonStyle={
        padding :'10px',
        margin :'5px',

    };
    const divStyle ={
        display: 'flex',
        justifyContent: 'center'
    }

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
                        <HomeIcon />
                    </Avatar>
                    <Box style={divStyle} >
                            <Button style={buttonStyle}  color="secondary" variant="outlined" onClick={handleChangePwdClick}>Changer PWD (t19)</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

};

