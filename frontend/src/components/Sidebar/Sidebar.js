import * as React from "react";
import { useState, useEffect } from "react";
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
import { Button } from "primereact/button";
import { API_URL } from "../../Config/config";
import axios from "axios";

const Sidebar = ({
  routes,
  userRole,
  handleDrawerClose,
  handleDrawerOpen,
  open,
}) => {
  const [notifCounter, setNotifCounter] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [toggleNotificationMenu, setToggleNotificationMenu] = useState(false);
  function logoutFn() {
    localStorage.removeItem("jwtToken");
    axios.post(`${API_URL}/notification/unsubscribeFromTopic`, {
      registrationToken: localStorage.getItem("notifToken"),
      topic: localStorage.getItem("userId"),
    });
    localStorage.removeItem("userId");
    window.location.reload();
  }
  const drawerWidth = 240;
  const location = useLocation();

  const filteredRoutes = routes.filter((route) =>
    route.allowedRoles.includes(userRole)
  );
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

  const getNotifications = () => {
    axios
      .get("http://localhost:3001/api/notification/getNotifications", {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then((res) => {
        setNotifications(res.data.notifications);
        let i = 0;
        res.data.notifications.map((notif) => {
          if (!notif.seen) i++;
        });
        setNotifCounter(i);
      });
  };

  useEffect(() => {
    getNotifications();
    const channel = new window.BroadcastChannel("sw-messages");
    channel.addEventListener("message", (event) => {
      getNotifications();
    });
    const channel2 = new window.BroadcastChannel("sw-messages-fr");
    channel2.addEventListener("message", (event) => {
      getNotifications();
    });
  }, []);

  const updateNotificationsSeen = () => {
    const notificationsIds = [];
    notifications?.map((notification) => {
      if (!notification.seen) notificationsIds.push(notification._id);
    });
    if (notificationsIds.length > 0)
      axios
        .put(
          "http://localhost:3001/api/notification/updateNotificationsSeen",
          { notificationsIds },
          {
            headers: { Authorization: localStorage.getItem("jwtToken") },
          }
        )
        .then((res) => {
          setNotifications(res.data.updatedNotifications);
          let i = 0;
          res.data.updatedNotifications.map((notif) => {
            if (!notif.seen) i++;
          });
          setNotifCounter(i);
        });
  };

  const toggleNotifications = () => {
    setToggleNotificationMenu(!toggleNotificationMenu);
    if (toggleNotificationMenu === false) updateNotificationsSeen();
  };

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

          <div
            onClick={() => toggleNotifications()}
            style={{
              marginLeft: "auto",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              padding: "5px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              viewBox="0 96 960 960"
              width="25"
            >
              <path d="M160 856v-60h84V490q0-84 49.5-149.5T424 258v-29q0-23 16.5-38t39.5-15q23 0 39.5 15t16.5 38v29q81 17 131 82.5T717 490v306h83v60H160Zm320-295Zm0 415q-32 0-56-23.5T400 896h160q0 33-23.5 56.5T480 976ZM304 796h353V490q0-74-51-126t-125-52q-74 0-125.5 52T304 490v306Z" />
            </svg>
            <div
              style={{
                color: "white",
                backgroundColor: "red",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20px",
                width: "20px",
                cursor: "pointer",
                position: "absolute",
                top: "-10px",
                right: "-8px",
                zIndex: 99,
              }}
            >
              {notifCounter}
            </div>{" "}
            {toggleNotificationMenu && (
              <div
                style={{
                  color: "white",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  padding: "20px",
                  gap: "20px",
                  height: "200px",
                  width: "250px",
                  overflowX: "hidden",
                  cursor: "pointer",
                  position: "absolute",
                  boxShadow: "0px 0px 1px 2px black",
                  border: "5px",
                  borderColor: "black",
                  top: "110%",
                  right: "0",
                  zIndex: 99,
                }}
              >
                {notifications?.map((notif) => (
                  <div style={{ color: "black" }} key={notif._id}>
                    {notif.title}
                    <br></br>
                    {notif.body}
                    <br></br>
                    {notif.createdAt?.slice(0, 10)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={logoutFn}
            style={{ marginLeft: "40px", backgroundColor: "red" }}
          >
            <strong style={{ color: "white" }}>Logout</strong>{" "}
          </Button>
        </Toolbar>
      </AppBar>
      ²
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
          {filteredRoutes.map((route, key) => {
            return (
              <ListItem key={key} disablePadding sx={{ display: "block" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={route.layout + route.path}
                  // tag={NavLinkRRD}
                  // onClick={closeCollapse}
                  className={
                    location.pathname === route.layout + route.path
                      ? "active"
                      : ""
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
            );
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