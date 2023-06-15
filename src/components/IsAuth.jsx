import React from "react";
import Home from "./Home/Home";
import Landing from "./Landing";
// import Signin from "./Signin";

const IsAuth = () => {
  let token = localStorage.getItem("token");
  if (token === null) token = sessionStorage.getItem("token");
  if (!token) return <Landing />;
  return <Home />;
};

export default IsAuth;
