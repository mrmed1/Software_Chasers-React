import Hello from "../components/Hello";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListEtudiant from "../components/CrudEtudiant/ListEtudiant";

const ROUTES = [

    {
        path: "/students",
        name: "Manage papa",
        icon: <InboxIcon/>,
        element: <ListEtudiant/>,
        layout: "/",
        allowedRoles: ["ADMIN"]
    }, {
        path: "/melek",
        name: "Manage cours",
        icon: <InboxIcon/>,
        element: <Hello/>,
        layout: "/admin",
        allowedRoles: ["ADMIN"]
    },

]
export default ROUTES