import Box from "@mui/material/Box";
import { useState } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import "./App.css";
import Hello from "./components/Hello";
import Sidebar from "./components/Sidebar/Sidebar";
import ROUTES from "./routes/ROUTES";
import { styled } from "@mui/material/styles";
import ListEtudiant from "./components/CrudEtudiant/ListEtudiant";
import { connectedUser } from "./Service/auth.service";
import Login from "./components/login/Login";
import { Navigate } from "react-router-dom";
import SecureRoute from "./components/SecureRoute/secureRoute";
import PwdUpdate from "./components/PwdUpdate/PwdUpdate";
import SuiviEtatCompteAllumni from "./components/SuiviEtatCompteAllumni/SuiviEtatCompteAllumni";

import Enseignant from "./components/Enseignants/Enseignant";
import Event from "./components/Event/Event";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Accueil/Home";
import StudentAccount from "./views/studentsViews/StudentAccount";
import CreateEventClub from "./components/EventClub/CreateEventClub/CreateEventClub";
import HomeEvent from "./components/EventClub/HomeEvent";
import HomeClub from "./components/Club/HomeClub";
import AddClub from "./components/Club/Add";

// PFA 
import CrudPFA from "./views/teacherViews/CrudPFA";
import MyPFA from "./views/teacherViews/MyPFA";
import PickPFAstudent from "./views/studentsViews/PickPFAstudent";
import PublishedPFa from "./views/adminViews/PublishedPFa";
import ValiderAlumni from "./components/ValiderCompteAlumni/ValiderAlumni";

//EventClub 
import EventClub from './components/EventClubComponent/EventClub';
import EventClubContainer from './components/EventContainer/EventClubContainer';

function App() {
  const [open, setOpen] = useState(false);
  const currenUser = { role: "ADMIN" };
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
    padding: theme.spacing(0, 1), // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <>
      {connectedUser() ? (
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
              <Route element={<SecureRoute />}>
                <Route exact path="/students" element={<ListEtudiant />} />
              </Route>
              <Route exact path="/Event/" element={<Event />} />
              <Route
                exact
                path="/students/profile"
                element={<StudentAccount />}
              />
              <Route exact path="/Enseignant/" element={<Enseignant />} />
              <Route element={<Home />} path="/" />
              <Route element={<PwdUpdate />} path="/PwdUpdate" />
              <Route element={<SignUp />} path="/SignUp" />
              <Route
                element={<SuiviEtatCompteAllumni />}
                path="/SuiviEtatCompteAllumni"
              />
              <Route exact path="/AddEvent" element={<CreateEventClub />} />
              <Route exact path="/HomeEvent" element={<HomeEvent />} />

              <Route exact path="/HomeClub" element={<HomeClub />} />
              <Route exact path="/create" element={<AddClub />} />

              {/* PFA */}
              <Route exact path="/teacher/PFA" element={<CrudPFA />} />
              <Route exact path="/teacher/myPFA" element={<MyPFA />} />
              <Route exact path="/admin/PFA" element={<PublishedPFa />} />
              <Route exact path="/students/PFA" element={<PickPFAstudent />} />
              <Route exact path="/ValiderAlumni" element={<ValiderAlumni />} />

              <Route exact path="/EventClubContainer" element={<EventClubContainer />} />
              <Route exact path="/EventClub" element={<EventClub />} />
                      

            </Routes>
          </Box>
        </Box>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
