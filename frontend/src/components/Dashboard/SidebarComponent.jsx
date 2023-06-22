import React, { useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  menuClasses,
  useProSidebar,
} from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box, useTheme } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Person3Icon from "@mui/icons-material/Person3";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const SidebarComponent = () => {
  const { palette } = useTheme();
  const { collapsed } = useProSidebar();

  // const logOut = () => {
  //   navigate("/");
  // };

  return (
    <>
      <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}>
          <Box>
            <Box
              sx={{ pt: 3, pb: 5, display: "flex", justifyContent: "center" }}>
              {collapsed ? (
                <Avatar alt="logo dashboard" src={"logodash"} />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{
                      width: "100px",
                      heigth: "100px",
                      textAlign: "center",
                      transition: "all ease-out .5s",
                    }}
                    src={"logoDashboard"}
                    alt="logo dashboard"
                  />
                </Box>
              )}
            </Box>

            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#fafafa",
                  },
                  [`&.${menuClasses.disabled}`]: {
                    color: "green",
                  },
                  "&:hover": {
                    backgroundColor: "",
                    color: "#fafafa",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: palette.primary.main,
                  },
                },
              }}>
              (
              <>
                <MenuItem component={<Link to="/" />} icon={<Person3Icon />}>
                  <div style={{ color: "black" }}>Analytics</div>
                </MenuItem>

                <MenuItem
                  component={<Link to="/places" />}
                  icon={<WorkHistoryIcon />}>
                  <div style={{ color: "black" }}>Host Places</div>
                </MenuItem>
                <MenuItem
                  component={<Link to="/users" />}
                  icon={<Person3Icon />}>
                  <div style={{ color: "black" }}>All Users</div>
                </MenuItem>
              </>
              )
            </Menu>
          </Box>
          <Box sx={{ pb: 2 }}>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#fafafa",
                  },

                  "&:hover": {
                    backgroundColor: "rgba(23,105,170, 1)",
                    color: "#fafafa",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    // color: "blue",
                    color: palette.primary.main,
                  },
                },
              }}>
              {/* <MenuItem  icon={<LoginIcon />}>
                <div style={{ color: "black" }}> Back </div>{" "}
              </MenuItem> */}
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default SidebarComponent;