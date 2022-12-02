import { UidContext } from "./components/AppContext.js";
import Routes from "./components/Routes";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

const App = () => {
  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);

  useEffect(() => {});

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
