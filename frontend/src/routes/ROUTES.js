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
import CrudPFA from '../views/teacherViews/CrudPFA';
import MyPFA from '../views/teacherViews/MyPFA';
import PickPFAstudent from "../views/studentsViews/PickPFAstudent";
import PublishedPFa from "../views/adminViews/PublishedPFa";
import ValiderAlumni from "../components/ValiderCompteAlumni/ValiderAlumni";
import SummerIntern from "../components/InternshipStudent/SummerIntern";
import EventForStudent from "../components/EventClub/EventForStudent";
import InsertPFEIntern from "../views/studentsViews/InsertPFEIntern";
import EventClub from "../components/EventClubComponent/EventClub";
import EventClubContainer from "../components/EventContainer/EventClubContainer";
import StatisticsPFE from "../components/StatisticsPFE/StatisticsPFE";
import DemandeVacation from "../components/Vacations/DemandeVacation";
import ListDemande from "../components/Vacations/ListDemande";
import SeeListPFE from "../views/adminViews/SeeListPFE";
import MyPFE from "../views/teacherViews/MyPFE";
import DemandExpertContract from "../components/Vacations/DemandExpertContract";
import PickPFETeacher from "../views/teacherViews/PickPFETeacher";
import EventContainer from "../components/EventContainer/EventContainer";
import Admin from "../components/CrudAdmin/Admin";
import CrudOffres from "../components/CRUD Offres/CrudOffres";
import AlumniStatistics from "../components/StatistiquesAlumni/AlumniStatistics";
import StatChomage from "../components/StatistiquesChomage/StatChomage";
const ROUTES = [

    {
        path: "/",
        name: "List Students",
        icon: <InboxIcon/>,
        element: <ListEtudiant/>,
        layout: "/students",
        allowedRoles: ["MANAGESTUDENTS"]
    },
    {
        path: "/",
        name: "List Enseignant",
        icon: <InboxIcon />,
        element: <Enseignant />,
        layout: "/Enseignant",
        allowedRoles: ["MANAGETEACHERS"],
    },
    {
        path: "/",
        name: "List Event",
        icon: <InboxIcon/>,
        element: <Event/>,
        layout: "/Event",
        allowedRoles :["MANAGEEVENTS"]
    },
    {
        path: "/",
        name: "Create Account Alumni",
        icon: <InboxIcon/>,
        element: <SignUp/>,
        layout: "/signup",
        allowedRoles :["ALUMNI"]
    },
    {
        path: "/",
        name: "Suivi account Alumni",
        icon: <InboxIcon/>,
        element: <SuiviEtatCompteAllumni/>,
        layout: "/SuiviEtatCompteAllumni",
        allowedRoles :["ALUMNI"]
    },
    {
        path: "/",
        name: "Change Password",
        icon: <InboxIcon/>,
        element: <UpdatePwd/>,
        layout: "/PwdUpdate",
        allowedRoles :["ALL"]
    },  {
        path: "/profile",
        name: "Show Profile",
        icon: <InboxIcon/>,
        element: <StudentAccount />,
        layout: "/students",
        allowedRoles: ["STUDENT","ALUMNI"],
    },
    {
        path: "/",
        name: "Create Event Club",
        icon: <InboxIcon/>,
        element: <CreateEventClub />,
        layout: "/AddEvent",
        allowedRoles: ["CLUB"],
    },
    {
        path: "/",
        name: "Event Club",
        icon: <InboxIcon/>,
        element: <HomeEvent />,
        layout: "/HomeEvent",
        allowedRoles: ["MANAGECLUBS"],
    },
    {
        path: "/",
        name: "All Club",
        icon: <InboxIcon/>,
        element: <HomeClub />,
        layout: "/HomeClub",
        allowedRoles: ["MANAGECLUBS"],

    },
    ///PFA

      {
        path: "/myPFA",
        name: "My PFA",
        icon: <InboxIcon/>,
        element: <MyPFA />,
        layout: "/teacher",
        allowedRoles: ["TEACHER"],
    },
    
    {
        path: "/PFA",
        name: "PFA",
        icon: <InboxIcon/>,
        element: <CrudPFA />,
        layout: "/teacher",
        allowedRoles: ["TEACHER"],
    },
     {
        path: "/PFA",
        name: "Pick PFA",
        icon: <InboxIcon />,
        element: <PickPFAstudent />,
        layout: "/students",
        allowedRoles: ["STUDENT"],
      },
      {
        path: "/PFA",
        name: "Validate PFA",
        icon: <InboxIcon />,
        element: <PublishedPFa />,
        layout: "/admin",
        allowedRoles: ["MANAGEINTERNSHIPS"],
      },
    {
        path: "/",
        name: "Valider Compte Alumni",
        icon: <InboxIcon/>,
        element: <ValiderAlumni />,
        layout: "/ValiderAlumni",
        allowedRoles: ["MANAGESTUDENTS"],
    },
    {
        path: "/",
        name: "Create Summer Internship",
        icon: <InboxIcon/>,
        element: <SummerIntern />,
        layout: "/SummerIntern",
        allowedRoles: ["STUDENT"],
    }
    ,
    {
        path: "/",
        name: "Create PFE Internship",
        icon: <InboxIcon/>,
        element: <InsertPFEIntern />,
        layout: "/InsertPFEIntern",
        allowedRoles: ["STUDENT"],
    },
    {
        path: "/",
        name: "My Event",
        icon: <InboxIcon/>,
        element: <EventClub />,
        layout: "/EventClub",
        allowedRoles: ["CLUB"],
    },
    {
        path: "/",
        name: "Event Club cards",
        icon: <InboxIcon/>,
        element: <EventClubContainer />,
        layout: "/EventClubContainer",
        allowedRoles: ["STUDENT","ALUMNI"],
    },
    {
        path: "/",
        name: "StatisticsPFE",
        icon: <InboxIcon/>,
        element: <StatisticsPFE />,
        layout: "/StatisticsPFE",
        allowedRoles: ["MANAGEINTERNSHIPS"],
    },
    {
        path: "/",
        name: "Demander Vacations",
        icon: <InboxIcon/>,
        element: <DemandeVacation />,
        layout: "/DemandeVacation",
        allowedRoles: ["ALUMNI"],
    },
    {
        path: "/",
        name: "All Request",
        icon: <InboxIcon/>,
        element: <ListDemande />,
        layout: "/AllRequest",
        allowedRoles: ["MANAGESTUDENTS"],

    },
    {
        path: "/",
        name: "See List PFE",
        icon: <InboxIcon/>,
        element: <SeeListPFE />,
        layout: "/SeeListPFE",
        allowedRoles: ["MANAGEINTERNSHIPS"],
    },

    {
        path: "/",
        name: "See My PFE",
        icon: <InboxIcon/>,
        element: <MyPFE />,
        layout: "/SeeMyPFE",
        allowedRoles: ["TEACHER"],
    }
    ,
    {
        path: "/",
        name: "Pick PFE Teacher",
        icon: <InboxIcon/>,
        element: <PickPFETeacher />,
        layout: "/PickPFETeacher",
        allowedRoles: ["TEACHER"],
    },{
        path: "/",
        name: "Demnde Expert Contract",
        icon: <InboxIcon/>,
        element: <DemandExpertContract />,
        layout: "/DemandeExpertContract",
        allowedRoles: ["ALUMNI"],
    },
     {
        path: "/",
        name: "Event Isamm cards",
        icon: <InboxIcon/>,
        element: <EventContainer />,
        layout: "/EventContainer",
        allowedRoles: ["STUDENT","ALUMNI"],
    },
    {
        path: "/",
        name: "List Admins",
        icon: <InboxIcon />,
        element: <Admin />,
        layout: "/Admin",
        allowedRoles: ["MANAGEALL"],
    },
    {
        path: "/",
        name: "List Offer",
        icon: <InboxIcon />,
        element: <CrudOffres />,
        layout: "/Offer",
        allowedRoles: ["ALUMNI"],
    },
    {
        path: "/",
        name: "Statistics Alumni",
        icon: <InboxIcon />,
        element: <AlumniStatistics />,
        layout: "/StatAlumni",
        allowedRoles: ["MANAGESTUDENTS"],
    },
    {
        path: "/",
        name: "Statistics Chomage",
        icon: <InboxIcon />,
        element: <StatChomage/>,
        layout: "/StatChomage",
        allowedRoles: ["MANAGESTUDENTS"],
    }
]
export default ROUTES