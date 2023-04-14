import InboxIcon from '@mui/icons-material/MoveToInbox';

import StudentAccount from "../views/studentsViews/StudentAccount";

import CrudPFA from '../views/teacherViews/CrudPFA';

const ROUTES = [

    {
        path: "/profile",
        name: "Show Profile",
        icon: <InboxIcon/>,
        element: <StudentAccount />,
        layout: "/students",
        allowedRoles: ["ADMIN"],
    },
    
    {
        path: "/PFA",
        name: "PFA",
        icon: <InboxIcon/>,
        element: <CrudPFA />,
        layout: "/teacher",
        allowedRoles: ["ADMIN"],
    }
]
export default ROUTES