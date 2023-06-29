import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { HOME, http, MY_PROFILE } from "../api";
import { useGlobal } from "../context";

const Navbar = () => {
  const searchRef = useRef(null);
  const {
    setHomeData,
    setIsHomeLoading,
    setUserInfo,
    setIsSearch,
    searchValue,
    setSearchValue,
    setCategoryName,
    setIsCategoryEmpty,
    setSelectedCategory,
    setNoVideoPhrase,
  } = useGlobal();
  const [profilePic, setProfilePic] = useState(null);
  function handleSearch() {
    if (searchValue==="") return toast.error("Please enter Keywords to look for");
    setNoVideoPhrase(searchValue);
    setIsHomeLoading(true);
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    axios
      .post(
        "https://beta-api-test.s360.cloud/api/videos/search",
        {
          keyword: searchRef.current.value,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          setHomeData(res.data.videos);
          setIsHomeLoading(false);
          setIsSearch(true);
          // window.location = "/home";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    axios
      .get("https://beta-api-test.s360.cloud/api/propic/view", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.profile_picture;
        setProfilePic(data);
      })
      .catch((e) => {
        console.log(e);
      });
    http
      .get(MY_PROFILE, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.profile[0];
        setUserInfo(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <nav className='angel-top-nav header'>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "white",
            color: "black",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "#B9F9C7",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#FEB8B8",
              color: "black",
            },
          },
        }}
      />
      <div className='angel-top-nav-divider-left'>
        <Link
          to='/'
          onClick={() => {
            handlehome();
          }}>
          <img
            src={require("../assets/images/olyoli-icon.png")}
            height={40}
            alt='logo'
          />
        </Link>
      </div>
      <div className='angel-top-nav-divider-right'>
        <div className='angel-top-icon-group'>
          <div className='angel-top-icon'>
            <input
              type='text'
              placeholder='Search'
              className='top-search'
              ref={searchRef}
              value={searchValue}
              onChange={() => setSearchValue(searchRef.current.value)}
              maxLength={50}
            />
            <Link
              to={`${searchValue !== "" ? "/" : "#"}`}
              className='top-search-submit'
              onClick={() => handleSearch()}>
              Search
            </Link>
          </div>
          <div className='angel-top-icon'>
            <div className='top-user-propic'>
              <Link to='/profile'>
                <img
                  src={
                    profilePic === null
                      ? require("../assets/images/propic.png")
                      : profilePic
                  }
                  alt='prop'
                  className='top-propic'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
