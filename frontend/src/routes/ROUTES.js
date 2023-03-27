import Hello from "../components/Hello";
import InboxIcon from '@mui/icons-material/MoveToInbox';

const ROUTES =[
    
    {
        path: "/students",
        name: "Manage papa",
        icon: <InboxIcon/>,
        element: <Hello/>,
        layout: "/admin",
        allowedRoles :["ADMIN"]
      },
      {
        path: "/melek",
        name: "Manage cours",
        icon: <InboxIcon/>,
        element: <Hello/>,
        layout: "/admin",
        allowedRoles :["ADMIN"]
      },
]
export default ROUTES