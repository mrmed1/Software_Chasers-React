import InboxIcon from '@mui/icons-material/MoveToInbox';


import MyPFA from '../views/teacherViews/MyPFA';

const ROUTES = [

    {
        path: "/myPFA",
        name: "My PFA",
        icon: <InboxIcon/>,
        element: <MyPFA />,
        layout: "/teacher",
        allowedRoles: ["ADMIN"],
    },
   
]
export default ROUTES