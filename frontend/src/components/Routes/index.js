import { Routes, Route } from "react-router-dom";
import Post from "../Post";
import Banner from "../Banner";
import React, { lazy } from "react";

const Register = lazy(() => import("../Register"));
const Login = lazy(() => import("../Login"));
const Home = lazy(() => import("../Home"));

const index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Banner />}>
          
          <Route path="/Post" element={<Post />} />
        </Route>
      </Routes>
    </div>
  );
};

export default index;
