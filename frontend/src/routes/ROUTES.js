import InboxIcon from '@mui/icons-material/MoveToInbox';


import CrudPFA from '../views/teacherViews/CrudPFA';

const ROUTES = [

 
    
    {
        path: "/PFA",
        name: "PFA",
        icon: <InboxIcon/>,
        element: <CrudPFA />,
        layout: "/teacher",
        allowedRoles: ["ADMIN"],
    },
    
  
]
export default ROUTES