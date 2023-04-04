
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Event from "../components/Event/Event";


const ROUTES =[
   
      {
        path: "/",
        name: "Add Event",
        icon: <InboxIcon/>,
        element: <Event/>,
        layout: "/Event",
        allowedRoles :["ADMIN"]
      },

]
export default ROUTES