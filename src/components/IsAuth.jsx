import React from "react";
import Home from "./Home/Home";
import Signin from "./Signin";

const IsAuth = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token") ? (
    <>
      <Home />
    </>
  ) : (
    <Signin />
  );
};

export default IsAuth;
