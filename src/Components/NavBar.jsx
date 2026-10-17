import React from "react";
import shopMore from "../assets/Images/ShorMoreeLogo.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={shopMore} alt="" />
      </div>
      <div className="links">
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
            <NavLink>items4</NavLink>
          </li>
          <li>
            <NavLink>items5</NavLink>
          </li>
          <li>
            <NavLink to='/'>LogOut</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
