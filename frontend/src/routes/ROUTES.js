import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import StudentAccount from "../views/studentsViews/StudentAccount";

const ROUTES = [
  {
    path: "/profile",
    name: "My Account",
    icon: <ManageAccountsIcon color="primary"/>,
    element: <StudentAccount />,
    layout: "/students",
    allowedRoles: ["ADMIN"],
  },
];
export default ROUTES;
