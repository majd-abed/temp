import React from "react";
import Home from "./Home/Home";
import Landing from "./Landing";
// import Signin from "./Signin";

const IsAuth = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token") ? (
    <>
      <Home />
    </>
  ) : (
    <Landing />
  );
};

export default IsAuth;
