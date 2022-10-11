import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import App from "./components/App";
import Register from "./components/Register";
import Login from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
