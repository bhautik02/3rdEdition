import { Box } from "@mui/material";
import React from "react";
import SidebarComponent from "./SidebarComponent";
import HeaderTop from "./HeaderTop";

const LayoutDash =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <SidebarComponent />
          <Box sx={{ width: "100%", bgcolor: " LightGray" }}>
            <HeaderTop />
            <Box sx={{ p: 3 }}>
              <Component {...props} />
            </Box>
          </Box>
        </div>
      </>
    );
  };

export default LayoutDash;
