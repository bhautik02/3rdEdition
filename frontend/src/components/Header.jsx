import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { SiGooglehome } from "react-icons/si";
import { userLogoutAsync } from "../store/user";

const pages = ["HostPlace", "Bookings", "Reservations", "Profile"];
const settings = ["Login", "Logout"];

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    dispatch(userLogoutAsync());
    navigate("/");
  };

  const activeClassName = ({ isActive }) =>
    isActive ? "underline underline-offset-4" : "";
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "white",
        color: "black",
        boxShadow: "none",
        // marginLeft: "5px",
      }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ marginLeft: "-135px", marginRight: "-135px" }}>
          <div className="mr-4">
            <SiGooglehome />
          </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            Accomodo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page) => (
                <div key={Math.random()}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </div>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                to={`/${page.toLowerCase()}`}
                key={page}
                className={activeClassName}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    mx: "10px",
                    // "&:hover": {
                    //   backgroundColor: "#F5385D",
                    //   color: "white",
                    // },
                  }}>
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>
          {user && (
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{ textAlign: "center", margin: "10px", fontSize: "16px" }}>
              {user?.name}
              {console.log("ftyguhijo", user)}
            </Typography>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={user?.profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <div key={setting}>
                  {setting === "Logout" ? (
                    <MenuItem onClick={logoutHandler} key={Math.random()}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ) : (
                    <Link to={`${setting.toLowerCase()}`}>
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        key={Math.random()}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </Link>
                  )}
                </div>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <hr />
    </AppBar>
  );
}
export default Header;
