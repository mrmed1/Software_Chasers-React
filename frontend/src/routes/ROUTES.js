import InboxIcon from '@mui/icons-material/MoveToInbox';

import PublishedPFa from "../views/adminViews/PublishedPFa";

const ROUTES = [

   
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