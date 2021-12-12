import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import "./Style.css";

function FooterNavigation() {
  const { user } = useContext(UserContext);

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
            <img src="/images/bookshelf.png" alt="" className="bottomNavImg" />
          }
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
