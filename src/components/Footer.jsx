import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HOME, http, MY_PROFILE } from "../api";
import { useGlobal } from "../context";

const Footer = () => {
  const {
    setCategoryName,
    setIsCategoryEmpty,
    setSelectedCategory,
    setIsHomeLoading,
    setHomeData,
    setSearchValue,
  } = useGlobal();
  const [notify, setNotify] = useState(null);

  const handlehome = () => {
    setIsHomeLoading(true);
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(HOME, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.video;
        setIsHomeLoading(false);
        setHomeData(data);
        setCategoryName("all");
        setIsCategoryEmpty(false);
        setSelectedCategory(0);
        setSearchValue("");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  async function handleLogout() {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await axios
      .post("https://beta-api-test.s360.cloud/api/logout", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location = "/signin";
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
              handlehome();
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
