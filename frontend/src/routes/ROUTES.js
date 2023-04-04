import InboxIcon from "@mui/icons-material/MoveToInbox";

import Enseignant from "../components/Enseignants/Enseignant";

const ROUTES = [
  {
    path: "/",
    name: "Add Enseignant",
    icon: <InboxIcon />,
    element: <Enseignant />,
    layout: "/Enseignant",
    allowedRoles: ["ADMIN"],
  },
];
export default ROUTES;
