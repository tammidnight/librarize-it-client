import {
  Card,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { LibraryContext } from "../../context/library.context";
import { UserContext } from "../../context/user.context";
import FooterNavigation from "../FooterNavigation";
import LoadingScreen from "../Loading/LoadingScreen";
import "./Library.css";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function LibraryOverview() {
  const { user, setUser } = useContext(UserContext);
  const { library, setLibrary } = useContext(LibraryContext);
  const { fetchingUser } = useContext(FetchingUserContext);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        let libraryResponse = await axios.get(
          `${API_URL}/profile/${user._id}`,
          {
            withCredentials: true,
          }
        );
        setLibrary(libraryResponse.data.libraries);
      }
    };
    getData();
  }, [user]);

  if (fetchingUser || !user || !library) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <h2 className="header">Your libraries</h2>
        <div className="cardDiv">
          {library.map((elem) => {
            return (
              <Card
                sx={{ width: 100, backgroundColor: "#dfe6ed" }}
                className="card"
                key={elem._id}
              >
                <CardMedia
                  component="img"
                  height="75"
                  image="/images/library.png"
                  alt="library"
                />
                <CardContent className="cardContent">
                  <Link to={`/library/${elem._id}`} className="cardLink">
                    <Typography>{elem.title}</Typography>
                  </Link>
                  <Link to={`/library/${elem._id}/edit`}>
                    <img
                      src="/images/pencil.png"
                      alt="settings"
                      className="pencil"
                    />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
          <Link to="/create-library">
            <img
              src="/images/add-library.png"
              alt="create-library"
              className="addlibrary"
            ></img>
          </Link>
        </div>
      </ThemeProvider>
      <FooterNavigation />
    </>
  );
}

export default LibraryOverview;
