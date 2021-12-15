import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchingUserContext } from "../context/fetchingUser.context";
import { UserContext } from "../context/user.context";
import LoadingScreen from "./Loading/LoadingScreen";
import "./Style.css";
import { API_URL } from "../config";

function FooterNavigation() {
  const { user, setUser } = useContext(UserContext);
  const { fetchingUser, setFetchingUser } = useContext(FetchingUserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        let userResponse = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setFetchingUser(false);
        setUser(userResponse.data);
      } catch (err) {
        setFetchingUser(false);
      }
    };

    getData();
  }, []);

  if (fetchingUser || !user) {
    return <LoadingScreen />;
  }

  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        width: 1.0,
        backgroundColor: "#dfe6ed",
        display: "flex",
        justifyContent: "space-around",
      }}
      className="bottomNav"
    >
      {/*   <Link to={"/messages"}>
        <BottomNavigationAction
          icon={<img src="/images/email.png" alt="" className="bottomNavImg" />}
        />
      </Link> */}
      <Link to={`/profile/${user._id}/library-overview`}>
        <BottomNavigationAction
          icon={
            <img src="/images/library.png" alt="" className="bottomNavImg" />
          }
        />
      </Link>
      <Link to={`/book-overview`}>
        <BottomNavigationAction
          icon={<img src="/images/books.png" alt="" className="bottomNavImg" />}
        />
      </Link>
      <Link to={`/profile/${user._id}`}>
        <BottomNavigationAction
          icon={<img src="/images/user.png" alt="" className="bottomNavImg" />}
        />
      </Link>
    </BottomNavigation>
  );
}

export default FooterNavigation;
