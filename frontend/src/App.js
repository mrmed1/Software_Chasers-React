import Box from '@mui/material/Box';
import { useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from './components/Home';
 
import Sidebar from "./components/Sidebar/Sidebar";
import ROUTES from "./routes/ROUTES";
import { styled } from "@mui/material/styles";
 
 

 
import AddEvent from './components/AddEvent'
import HomeEvent from './components/HomeEvent';
 


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
  return (
      <Box  sx={{ display: 'flex' }}>
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

          <Route exact path="/" element={<Home />} />
          
        
           <Route exact path="/AddEvent" element={<AddEvent />} />
          <Route exact path="/HomeEvent" element={<HomeEvent />} />

 
          

          
        {/*   <Route exact path="/profile" element={<Hello />} /> */}
        </Routes>
        </Box>
          
        </Box>
  );
}

export default App;
