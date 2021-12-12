import { createTheme, Button, ThemeProvider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function LandingPage() {
  return (
    <div className="landingPage">
      <div className="overview">
        <img src="/images/logo.png" alt="" className="landingLogo" />
        <h2>
          Your space to create your
          <br />
          own libraries to have a<br />
          full overview of your books
        </h2>
      </div>
      <ThemeProvider theme={theme}>
        <div className="signUpLogIn">
          <div className="langindPageBtnDiv">
            <p className="landingPageP">
              New to
              <br />
              librarize?
            </p>
            <Button variant="contained" sx={{ width: "100%" }}>
              <Link to="/signup" className="landingPageLink">
                Sign Up
              </Link>
            </Button>
          </div>
          <div className="langindPageBtnDiv">
            <p className="landingPageP">
              Already a<br />
              book lover?
            </p>
            <Button variant="contained" sx={{ width: "100%" }}>
              <Link to="/login" className="landingPageLink">
                Log In
              </Link>
            </Button>
          </div>
        </div>
      </ThemeProvider>
      <div className="about">
        <h4>About librarize it</h4>
        <p>Lorem ipsum blablabla</p>
      </div>
    </div>
  );
}

export default LandingPage;
