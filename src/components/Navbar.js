import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link } from "react-router-dom";
import "./Style.css";
import { UserContext } from "../context/user.context";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#8dd7cf", contrastText: "#6e6e6e" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

const settings = [
  { name: "Home", path: "/" },
  { name: "Log In", path: "/login" },
  { name: "Sign Up", path: "/signup" },
];

function Navbar(props) {
  const { user } = React.useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box
              noWrap
              component="img"
              sx={{
                display: { xs: "flex", md: "none" },
                height: 51,
              }}
              alt="Your logo."
              src="/images/logo-grey.png"
              className="logo"
            />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {settings.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#6e6e6e", display: "block" }}
                >
                  <Link to={page.path} className="link">
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              {user ? (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={props.onLogOut}
                  color="inherit"
                >
                  <LogoutRoundedIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuRoundedIcon />
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
                    }}
                  >
                    {settings.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to={page.path} className="link">
                            {page.name}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
