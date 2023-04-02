import Box from '@mui/material/Box';
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ROUTES from "./routes/ROUTES";
import { styled } from "@mui/material/styles";
import StudentAccount from './views/studentsViews/StudentAccount';

function App() {
  const [open, setOpen] = useState(false);
  const currenUser = { role: "ADMIN" };

 
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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

          <Route exact path="/students/profile" element={<StudentAccount />} />
         
        </Routes>
        </Box>
          
        </Box>
  );
}

export default App;
