import InboxIcon from '@mui/icons-material/MoveToInbox';

import StudentAccount from "../views/studentsViews/StudentAccount";

import CrudPFA from '../views/teacherViews/CrudPFA';
import MyPFA from '../views/teacherViews/MyPFA';
import PickPFAstudent from "../views/studentsViews/PickPFAstudent";
import PublishedPFa from "../views/adminViews/PublishedPFa";
const ROUTES = [

    {
        path: "/myPFA",
        name: "My PFA",
        icon: <InboxIcon/>,
        element: <MyPFA />,
        layout: "/teacher",
        allowedRoles: ["ADMIN"],
    },
    
    {
        path: "/PFA",
        name: "PFA",
        icon: <InboxIcon/>,
        element: <CrudPFA />,
        layout: "/teacher",
        allowedRoles: ["ADMIN"],
    },
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
        name: "Pick PFA",
        icon: <InboxIcon />,
        element: <PickPFAstudent />,
        layout: "/students",
        allowedRoles: ["ADMIN"],
      },
      {
        path: "/PFA",
        name: "Validate PFA",
        icon: <InboxIcon />,
        element: <PublishedPFa />,
        layout: "/admin",
        allowedRoles: ["ADMIN"],
      },
]
export default ROUTES