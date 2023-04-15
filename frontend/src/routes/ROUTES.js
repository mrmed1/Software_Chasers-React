import InboxIcon from '@mui/icons-material/MoveToInbox';


import CrudPFA from '../views/teacherViews/CrudPFA';
import MyPFA from '../views/teacherViews/MyPFA';
import PickPFAstudent from '../views/studentsViews/PickPFAstudent';

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
        path: "/PFA",
        name: "Pick PFA",
        icon: <InboxIcon/>,
        element: <PickPFAstudent />,
        layout: "/students",
        allowedRoles: ["ADMIN"],
    }
]
export default ROUTES