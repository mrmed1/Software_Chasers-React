import Hello from "../components/Hello";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListEtudiant from "../components/CrudEtudiant/ListEtudiant";
import Enseignant from "../components/Enseignants/Enseignant";
import Event from "../components/Event/Event";
import SignUp from "../components/SignUp/SignUp";
import SuiviEtatCompteAllumni from "../components/SuiviEtatCompteAllumni/SuiviEtatCompteAllumni";
import UpdatePwd from "../components/PwdUpdate/PwdUpdate";
import StudentAccount from "../views/studentsViews/StudentAccount";
import CreateEventClub from "../components/EventClub/CreateEventClub/CreateEventClub";
import HomeEvent from "../components/EventClub/HomeEvent";

import HomeClub from "../components/Club/HomeClub";

const ROUTES = [

    {
        path: "/",
        name: "List Students",
        icon: <InboxIcon/>,
        element: <ListEtudiant/>,
        layout: "/students",
        allowedRoles: ["ADMIN"]
    },
    {
        path: "/",
        name: "List Enseignant",
        icon: <InboxIcon />,
        element: <Enseignant />,
        layout: "/Enseignant",
        allowedRoles: ["ADMIN"],
    },
    {
        path: "/",
        name: "List Event",
        icon: <InboxIcon/>,
        element: <Event/>,
        layout: "/Event",
        allowedRoles :["ADMIN"]
    },
    {
        path: "/",
        name: "Create Account Alumni",
        icon: <InboxIcon/>,
        element: <SignUp/>,
        layout: "/signup",
        allowedRoles :["ADMIN"]
    },
    {
        path: "/",
        name: "Suivi account Alumni",
        icon: <InboxIcon/>,
        element: <SuiviEtatCompteAllumni/>,
        layout: "/SuiviEtatCompteAllumni",
        allowedRoles :["ADMIN"]
    },
    {
        path: "/",
        name: "Change Password",
        icon: <InboxIcon/>,
        element: <UpdatePwd/>,
        layout: "/PwdUpdate",
        allowedRoles :["ADMIN"]
    },  {
        path: "/profile",
        name: "Show Profile",
        icon: <InboxIcon/>,
        element: <StudentAccount />,
        layout: "/students",
        allowedRoles: ["ADMIN"],
    },
    {
        path: "/",
        name: "Create Event Club",
        icon: <InboxIcon/>,
        element: <CreateEventClub />,
        layout: "/AddEvent",
        allowedRoles: ["ADMIN"],
    },
    {
        path: "/",
        name: "Event Club",
        icon: <InboxIcon/>,
        element: <HomeEvent />,
        layout: "/HomeEvent",
        allowedRoles: ["ADMIN"],
    },
    {
        path: "/",
        name: "All Club",
        icon: <InboxIcon/>,
        element: <HomeClub />,
        layout: "/HomeClub",
        allowedRoles: ["ADMIN"],
    }
]
export default ROUTES