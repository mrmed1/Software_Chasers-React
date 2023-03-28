import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Hello from "./components/Hello";
import Sidebar from "./components/Sidebar/Sidebar";
import ROUTES from "./routes/ROUTES";
import { styled } from "@mui/material/styles";
import Login from "./components/login/Login";
import Box from "@mui/material/Box";

function App() {
    const [open, setOpen] = useState(false);
    const currenUser = { role: "ADMIN" };

    const drawerWidth = 240;
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        })
    );
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const AuthLayout = () => (
        <Login />
    );

    const DefaultLayout = () => (
        <Box sx={{ display: "flex" }}>
            <Sidebar
                routes={ROUTES}
                userRole={currenUser.role}
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Routes>
                    <Route exact path="/" element={<Hello />} />
                    <Route exact path="/admin/students" element={<Hello />} />
                    <Route exact path="/courses" element={<Hello />} />
                    <Route exact path="/profile" element={<Hello />} />
                </Routes>
            </Box>
        </Box>
    );

    return (
        <Routes>
            <Route path="/auth" element={<AuthLayout />} />
            <Route path="/" element={<DefaultLayout />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
