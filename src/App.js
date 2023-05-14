import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
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
import UnivYear from "./views/adminViews/UnivYear";
import ValiderAlumni from "./components/ValiderCompteAlumni/ValiderAlumni";

import { messaging } from "./index.js";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";
import { API_URL } from "./Config/config";

function App() {
  const [open, setOpen] = useState(false);
  const currenUser = { role: "ADMIN" };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifBody, setNotifBody] = useState("");
  const [notifTitle, setNotifTitle] = useState("");

  function handleLogin(isLoggedIn) {
    setIsLoggedIn(isLoggedIn);
  }

  const activate = () => {
    getToken(messaging, {
      vapidKey:
        "BIDaC4h8eIKcIOby3l5IvTvdi_kq71-T5gX4s6blIVUSNbnTMt_6bq3l4i5UQ2DHx9TAABuAWW6izbRl1TXplvA",
    }).then((currentToken) => {
      if (currentToken) {
        localStorage.setItem("notifToken", currentToken);
        let userId = localStorage.getItem("userId");
        if (userId)
          axios.post(`${API_URL}/notification/subscribeToTopic`, {
            registrationToken: currentToken,
            topic: "test",
          });
      }
    });
  };

  useEffect(() => {
    activate();
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      setNotifBody(payload.notification.body);
      setNotifTitle(payload.notification.title);
      setShowNotif(true);
      // setTimeout(() => {
      //   setShowNotif(false);
      // }, 5000);
    });
    const channel = new window.BroadcastChannel("sw-messages");
    channel.addEventListener("message", (event) => {
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
      }, 5000);
    });
  }, []);

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
      {showNotif && (
        <div className="notification">
          <span className="title">{notifTitle}</span>
          <span>{notifBody}</span>

          <span
            onClick={() => {
              setShowNotif(false);
            }}
            className="svg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
            >
              <path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
            </svg>
          </span>
        </div>
      )}
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
              <Route exact path="/admin/university-year" element={<UnivYear />} />
              <Route exact path="/students/PFA" element={<PickPFAstudent />} />
              <Route exact path="/ValiderAlumni" element={<ValiderAlumni />} />
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
