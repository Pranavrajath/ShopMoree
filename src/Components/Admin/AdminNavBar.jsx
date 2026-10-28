import React from "react";
import { NavLink } from "react-router-dom";
import shopMore from "../../assets/Images/ShorMoreeLogo.png";

const AdminNavBar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/adminportal/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/adminportal/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/adminportal/addproduct">Add Product</NavLink>
        </li>
        <li>
          <NavLink to="/adminportal/register">User Register</NavLink>
        </li>
        <li>
          <NavLink to="/">Log Out</NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminNavBar;
