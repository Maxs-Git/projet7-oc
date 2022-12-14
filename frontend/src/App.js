import { UidContext } from "./components/AppContext.js";
import Routes from "./components/Routes";
import { useDispatch } from "react-redux";
import React, {  useState } from "react";

const App = () => {

  const [uid] = useState(null);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
