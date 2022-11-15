import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import App from "./components/App";
import React, { lazy, Suspense, useState } from "react";
import store from "./app/store";
// import Register from "./components/Register";
// import Login from "./components/Login";
import Post from "./components/Post";

const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Post />} />
          <Route path="/Post" element={<Post />} />
          {/* <Route path="/Post" element={<Post />} /> */}
        </Routes>
      </Suspense>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
