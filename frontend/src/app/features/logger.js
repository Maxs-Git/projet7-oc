// import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
// import registerUser from "./user.js";

// function logger({ getState }) {
//   return (next) => (action) => {
//     console.log("will dispatch", action);

//     const returnValue = next(action);
//     console.log("state after dispatch", getState());
//   };
// }
// const store = configureStore(
//   registerUser,
//   ["use redux"],
//   applyMiddleware(logger)
// );

// store.dispatch({
//   type: "logger",
//   text: "understand the middleware",
// });
