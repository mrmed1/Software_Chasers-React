import InboxIcon from "@mui/icons-material/MoveToInbox";

import CrudPFA from "../views/teacherViews/CrudPFA";
import MyPFA from "../views/teacherViews/MyPFA";
import PickPFAstudent from "../views/studentsViews/PickPFAstudent";
import PublishedPFa from "../views/adminViews/PublishedPFa";


const ROUTES = [
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
];
export default ROUTES;
