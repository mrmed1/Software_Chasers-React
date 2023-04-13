import InboxIcon from '@mui/icons-material/MoveToInbox';

import StudentAccount from "../views/studentsViews/StudentAccount";

import PFAList from "../components/PFA/PFAList";

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
        element: <PFAList />,
        layout: "/teacher",
        allowedRoles: ["ADMIN"],
    }
]
export default ROUTES