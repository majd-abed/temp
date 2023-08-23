import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Menus from "./Menus";
import Navbar from "./Navbar";

const NavMenus = () => {
  const { pathname } = useLocation();
  const { vidId } = useParams();
  let token = localStorage.getItem("token");
  if (token === null) token = sessionStorage.getItem("token");
  if (!token) return null;
  const withouMenusRoutes = [
    "/profile",
    "/likes-notifications",
    "faqs-notifications",
    "video-post",
    `/${vidId}`,
    `/my-videos/${vidId}`,
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
