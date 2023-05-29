import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http, MY_PROFILE } from "../api";
import { useGlobal } from "../context";

const Footer = () => {
  const { setCategoryName, setIsCategoryEmpty, setSelectedCategory } = useGlobal();
  const [notify, setNotify] = useState(null);
  const handleLogout = () => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(MY_PROFILE, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.profile[0].user_id;
        axios
          .post(`http://s360.cloud/glueprobeta/api/logout/${data}`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          })
          .then((res) => {
            console.log("logout", res);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location = "/signin";
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get("/api/notifications/notify", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.notify;
        setNotify(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <footer>
      <div className='angel-foot-nav'>
        <div className='angel-foot-icon-group'>
          <Link
            to='/'
            onClick={() => {
              setCategoryName("all");
              setIsCategoryEmpty(false);
              setSelectedCategory(0);
            }}
            className='angel-foot-icon'>
            <span className='material-symbols-outlined'>home</span>
          </Link>
          <Link
            to='/subscriptions'
            onClick={() => {
              setCategoryName("all");
              setIsCategoryEmpty(false);
              setSelectedCategory(0);
            }}
            className='angel-foot-icon'>
            <span className='material-symbols-outlined'>video_library</span>
          </Link>
          <Link
            to='/video-post'
            onClick={() => {
              setCategoryName("all");
              setIsCategoryEmpty(false);
              setSelectedCategory(0);
            }}
            className='angel-foot-icon'>
            <span className='material-symbols-outlined'>video_call</span>
          </Link>
          <Link
            to='/likes-notifications'
            onClick={() => {
              setCategoryName("all");
              setIsCategoryEmpty(false);
              setSelectedCategory(0);
            }}
            className='angel-foot-icon notify-parent'>
            <div
              className='notify'
              style={{ display: `${notify ? "flex" : "none"}` }}>
              {notify}
            </div>
            <span className='material-symbols-outlined'>notifications</span>
          </Link>
          <button
            className='angel-foot-icon logout-btn'
            onClick={() => handleLogout()}>
            <span className='material-symbols-outlined'>logout</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
