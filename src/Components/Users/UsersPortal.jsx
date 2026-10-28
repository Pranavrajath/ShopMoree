import Home from "../Pages/Home";
import Products from "../Pages/Products";
import ViewMore from "../Pages/ViewMore";
import NavBar from "../NavBar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../Pages/PageNotFound";

const UsersPortal = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Products />} path="/products" />
        <Route element={<ViewMore />} path="/viewmore/:id" />
        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </>
  );
};

export default UsersPortal;
