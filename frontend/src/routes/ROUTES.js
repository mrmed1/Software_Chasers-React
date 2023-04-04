import EventForm from "../components/EventForm/EventForm";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Event from "../components/Event/Event";
import Enseignant from "../components/Enseignants/Enseignant";

const ROUTES =[
   
      {
        path: "/",
        name: "Add Event",
        icon: <InboxIcon/>,
        element: <Event/>,
        layout: "/Event",
        allowedRoles :["ADMIN"]
      },
      {
        path: "/",
        name: "Add Enseignant",
        icon: <InboxIcon/>,
        element: <Enseignant/>,
        layout: "/Enseignant",
        allowedRoles :["ADMIN"]
      },
]
export default ROUTES