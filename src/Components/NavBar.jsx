import React from "react";
import shopMore from "../assets/Images/ShorMoreeLogo.png";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  // useLocation is present in react-router dom which is used to get the path and 
  // it retruns object
  const location = useLocation();
  console.log(location);

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
            <NavLink to="/adminportal/register">User Register</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
