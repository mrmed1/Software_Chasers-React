import Box from '@mui/material/Box';
import {useState} from "react";
import {Route, Routes, redirect} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ROUTES from "./routes/ROUTES";
import {styled} from "@mui/material/styles";
import {connectedUser} from "./Service/auth.service";
import Login from "./components/login/Login";
import SecureRoute from "./components/SecureRoute/secureRoute";


import StudentAccount from "./views/studentsViews/StudentAccount";

import PFAList from './components/PFA/PFAList';

function App() {
    const [open, setOpen] = useState(false);
    const currenUser = {role: "ADMIN"};
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    function handleLogin(isLoggedIn) {
        setIsLoggedIn(isLoggedIn);
    }

    const drawerWidth = 240;
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
        flexGrow: 1, padding: theme.spacing(3), transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }), marginLeft: `-${drawerWidth}px`, ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
            }), marginLeft: 0,
        }),
    }));
    const DrawerHeader = styled("div")(({theme}) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1), // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (<>
            {connectedUser() ? <Box sx={{display: 'flex'}}>
                <Sidebar
                    routes={ROUTES}
                    userRole={currenUser.role}
                    open={open}
                    handleDrawerClose={handleDrawerClose}
                    handleDrawerOpen={handleDrawerOpen}
                />
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader/>
                    <Routes>
                        <Route element={<SecureRoute/>}>
                        
                        </Route>
                      
                        <Route exact path="/students/profile" element={<StudentAccount />} />
                       
                       

                       
                        <Route exact path="/teacher/PFA" element={<PFAList />} />
                    </Routes>
                </Box>

            </Box> : <Login onLogin={handleLogin}/>}
        </>

    )
}

export default App;
