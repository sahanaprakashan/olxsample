import React, { useContext, useEffect } from "react";
import "./App.css";
import ViewDetails from "./store/Viewcontext";
import { LogContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { setuser } = useContext(LogContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        setuser(user);
      } else {
      }
    });

    //  console.log(user);
  });
  return (
    <div>
      <ViewDetails>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      </ViewDetails>
    </div>
  );
}

export default App;
