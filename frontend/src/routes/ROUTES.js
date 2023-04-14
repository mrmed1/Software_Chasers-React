import InboxIcon from '@mui/icons-material/MoveToInbox';

import StudentAccount from "../views/studentsViews/StudentAccount";



const ROUTES = [

    {
        path: "/profile",
        name: "Show Profile",
        icon: <InboxIcon/>,
        element: <StudentAccount />,
        layout: "/students",
        allowedRoles: ["ADMIN"],
    },

]
export default ROUTES