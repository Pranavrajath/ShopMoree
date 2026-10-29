import React from "react";
import { NavLink } from "react-router-dom";
import shopMore from "../../assets/Images/ShorMoreeLogo.png";

const UserNavBar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/usersportal/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/usersportal/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/usersportal/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/">Log Out</NavLink>
        </li>
      </ul>
    </>
  );
};

export default UserNavBar;
