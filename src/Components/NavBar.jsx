import React from "react";
import shopMore from "../assets/Images/ShorMoreeLogo.png";
import { NavLink, useLocation } from "react-router-dom";
import AdminNavBar from "./Admin/AdminNavBar";
import UserNavBar from "./Users/UserNavBar";

const NavBar = () => {
  // useLocation is present in react-router dom which is used to get the complete path and
  // it retruns object
  const location = useLocation();
  const bool = location.pathname.startsWith("/adminportal/");

  return (
    <div className="navbar">
      <div className="logo">
        <img src={shopMore} alt="" />
      </div>
      <div className="links">{bool ? <AdminNavBar /> : <UserNavBar />}</div>
    </div>
  );
};

export default NavBar;
