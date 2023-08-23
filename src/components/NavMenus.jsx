import React from "react";
import { useLocation } from "react-router-dom";
import Menus from "./Menus";
import Navbar from "./Navbar";

const NavMenus = () => {
  const { pathname } = useLocation();
  let token = localStorage.getItem("token");
  if (token === null) token = sessionStorage.getItem("token");
  if (!token) return null;
  const withouMenusRoutes = [
    "/profile",
    "/likes-notifications",
    "faqs-notifications",
    "video-post",
  ];

  return (
    <header>
      <Navbar />
      {withouMenusRoutes.some((item) => pathname.includes(item)) ? null : (
        <div className='menu-slider'>
          <Menus />
        </div>
      )}
    </header>
  );
};

export default NavMenus;
