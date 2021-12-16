import { GitHub, LinkedIn } from "@mui/icons-material";
import { createTheme, Button, ThemeProvider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
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
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user._id}`);
    }
  }, [user]);

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
        <p>
          Librarize it is a place for all booklovers to sort and categorise
          their books. You can create as many libraries as you want and add
          books to them.
        </p>
        <p>
          Books can be given a personal status (did you already read it or did
          you just started with it), they can also be rated and reviewed. Browse
          through all rated books, read the reviews of other users and get
          inspired.
        </p>
        <h4>About me</h4>
        <p>
          My name is Tamara and I just love reading. I wanted to create a place
          for all bookslovers to have a full overview of their books. Fell free
          to tell me what you think about it.
          <br />
          <a
            href="https://github.com/tammidnight/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub sx={{ color: "#1bae9f" }} />
          </a>
          <a
            href="https://https://www.linkedin.com/in/tamara-rott/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn sx={{ color: "#1bae9f" }} />
          </a>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
