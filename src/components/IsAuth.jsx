import React from "react";
import Home from "./Home/Home";
import Landing from "./Landing";
// import Signin from "./Signin";

const IsAuth = () => {
  if (!localStorage.getItem("token") && !sessionStorage.getItem("token"))
    return <Landing />;
  return <Home />;
};

export default IsAuth;
