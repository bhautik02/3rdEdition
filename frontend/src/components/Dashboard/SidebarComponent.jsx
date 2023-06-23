import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  menuClasses,
  useProSidebar,
} from "react-pro-sidebar";
import { HiUsers } from "react-icons/hi";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import { FaPlaceOfWorship } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";
import { userLogoutAsync } from "../../store/user";

const SidebarComponent = () => {
  const { collapsed } = useProSidebar();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAsync());
  };

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
                <Box sx={{ display: "flex-column", justifyContent: "center" }}>
                  <BiHomeAlt2 className="w-16 h-16" />
                  <div className="-ml-2">FeelsHome</div>
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
                    color: "black",
                  },
                },
              }}>
              <>
                <MenuItem
                  component={<Link to="/" />}
                  icon={<FaPlaceOfWorship className="w-6 h-6" />}>
                  <div style={{ color: "black" }}>Host Places</div>
                </MenuItem>
                <MenuItem
                  component={<Link to="/users" />}
                  icon={<HiUsers className="w-6 h-6" />}>
                  <div style={{ color: "black" }}>All Users</div>
                </MenuItem>
              </>
            </Menu>
          </Box>
          <Box sx={{ pb: 2 }}>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#fafafa",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: "black",
                  },
                },
              }}>
              <MenuItem icon={<LoginIcon />}>
                <div style={{ color: "black" }} onClick={logoutHandler}>
                  Logout
                </div>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default SidebarComponent;
