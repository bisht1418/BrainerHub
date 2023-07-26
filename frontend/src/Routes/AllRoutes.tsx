import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Product from "../Pages/Product";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
