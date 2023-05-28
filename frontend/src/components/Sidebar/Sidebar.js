import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, Link } from "react-router-dom";
import {Button} from "primereact/button";
 
import SearchBar2 from "../Search/SearchBar2";
import { connectedUser } from "../../Service/auth.service";
import { useNavigate } from 'react-router-dom';

const ROLE = connectedUser()?.role;

const Sidebar = ({
  routes,
  userRole,
  handleDrawerClose,
  handleDrawerOpen,
  open,access
}) => {
  const navigate = useNavigate();
  function logoutFn() {
    localStorage.removeItem('jwtToken');
    navigate('/login');
    window.location.reload();

  }
  const drawerWidth = 240;
  const location = useLocation();

  const filteredRoutes = routes.filter( (route) => {
    if (route.allowedRoles.includes("ALL")) {
      return true;
    } else if (userRole === "ADMIN") {

      const hasAccess = access.some((permission) => route.allowedRoles.includes(permission));

      console.log(hasAccess);
      return hasAccess

    } else {
      return route.allowedRoles.includes(userRole);
    }
  });
  
  const theme = useTheme();
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Software_Chasers-React
          </Typography>
          {ROLE === 'TEACHER' || ROLE === 'STUDENT' || ROLE === 'ALUMNI' ? <SearchBar2 /> : null}

          <Button  onClick={logoutFn} style={{marginLeft:"auto",backgroundColor:"red"}}><strong style={{color: "white"}}>Logout</strong> </Button>
        </Toolbar>
      </AppBar>²
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {filteredRoutes.map((route,key) => {
            return(
<ListItem key={key} disablePadding sx={{ display: "block" }}>
               
               <Link
                 style={{ textDecoration: "none" }}
                 to={route.layout + route.path}
                 // tag={NavLinkRRD}
                 // onClick={closeCollapse}
                 className={
                   location.pathname === route.layout + route.path ? "active" : ""
                 }
               >
                 <ListItemButton
                   sx={{
                     minHeight: 48,
                     justifyContent: open ? "initial" : "center",
                     px: 2.5,
                   }}
                 
                 >
                   <ListItemIcon
                     sx={{
                       minWidth: 0,
                       mr: open ? 3 : "auto",
                       justifyContent: "center",
                     }}
                   >
                     {route.icon}
                   </ListItemIcon>
                   <ListItemText
                     primary={route.name}
                     sx={{ opacity: open ? 1 : 0 }}
                   />
                 </ListItemButton>
               </Link>
             </ListItem>
            )
            
          })}
        </List>
        <Divider />
      </Drawer>
      

    </>
 
  );
};
Sidebar.defaultProps = {
  routes: [{}],
};
export default Sidebar;
