import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/user.context";
import FooterNavigation from "../FooterNavigation";
import LoadingScreen from "../Loading/LoadingScreen";
import "./Library.css";
import LibraryOverviewGrid from "./LibraryOverviewGrid";
import LibraryOverviewList from "./LibraryOverviewList";

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
  const [library, setLibrary] = useState(null);
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

  const handleView = async () => {
    let response = await axios.patch(
      `${API_URL}/view`,
      { grid: !user.grid },
      { withCredentials: true }
    );
    setUser(response.data);
  };

  if (fetchingUser || !user || !library) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="libraryDiv">
          <h2 className="header">
            Your libraries{" "}
            {user.grid ? (
              <img
                src="/images/list.png"
                alt=""
                className="gridListLibrary"
                onClick={handleView}
              />
            ) : (
              <img
                src="/images/grid.png"
                alt=""
                className="gridListLibrary"
                onClick={handleView}
              />
            )}
          </h2>
          <div className="cardDiv">
            {user.grid ? (
              <LibraryOverviewGrid library={library} />
            ) : (
              <LibraryOverviewList library={library} />
            )}
          </div>
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
