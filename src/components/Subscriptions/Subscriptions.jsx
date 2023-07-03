import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { http, MY_SUBSCRIPTIONS } from "../../api";
import { useGlobal } from "../../context";
import Footer from "../Footer";
import Menus from "../Menus";
import Navbar from "../Navbar";
import Spinner from "../Spinner";
import SubVideo from "./SubVideo";

const Subscriptions = () => {
  const {
    subData,
    setSubData,
    categoryName,
    setCategoryName,
    isCategoryEmpty,
    setIsCategoryEmpty,
    setSelectedCategory,
  } = useGlobal();
  const [isLoading, setIsLoading] = useState(true);
  const [likeData, setLikeData] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const previousVideoSubRef = useRef(null);

  // const filterSearch = (element, homeData) => {
  //   if (!homeData) return null;
  //   let tem = homeData.filter((e) => element.video_id === e.video_id);
  //   return tem;
  // };
  // const filterLikedata = (data, user, vid) => {
  //   let tem = data.filter((e) => e.user_id === user && e.video_id === vid);
  //   return tem;
  // };
  const handleChange = (e) => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    if (e.target.value === "newest") {
      setIsLoading(true);
      http
        .get("/api/mysubscriptions/newest-to-oldest", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((res) => {
          const data = res.data["my subscriptions"];
          setSubData(data);
          setIsLoading(false);
          setIsCategoryEmpty(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (e.target.value === "oldest") {
      setIsLoading(true);
      http
        .get("/api/mysubscriptions/oldest-to-newest", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((res) => {
          const data = res.data["my subscriptions"];
          setSubData(data);
          setIsLoading(false);
          setIsCategoryEmpty(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(MY_SUBSCRIPTIONS, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data["my subscriptions"];
        setSubData(data);
        setIsLoading(false);
        setCategoryName("all");
        setIsCategoryEmpty(true);
      })
      .catch((e) => {
        console.log(e);
      });
    http
      .get("/api/videos/likes", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.likes;
        if (data !== "Likes Not Found!") setLikeData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [trigger]);
  useEffect(() => {}, [subData, categoryName, likeData]);
  if (!localStorage.getItem("token") && !sessionStorage.getItem("token"))
    return <Navigate to='/' replace={true} />;
  return (
    <>
      <div className='angel-container-list'>
        <div className='top-sub-menu'>
          <div className='angel-top-sub-nav-divider-left'>
            <Link className='primary-btn' value='' style={{ marginRight: "5px" }}>
              Subcriptions
            </Link>
            <Link
              to='/my-videos'
              onClick={() => setSelectedCategory(0)}
              className='secondary-btn'>
              My Videos
            </Link>
          </div>
          <div className='angel-top-sub-nav-divider-right'>
            {subData ? (
              <select className='select-filter-option' onChange={handleChange}>
                <option id={9999} key={9999} hidden>
                  Filter
                </option>
                <option value='newest'>Newest to Oldest</option>
                <option value='oldest'>Oldest to Newest</option>
              </select>
            ) : null}
          </div>
        </div>
      </div>
      <div className='videos-container'>
        {isLoading ? (
          <div className='videos-spinner'>
            <Spinner />
          </div>
        ) : subData ? (
          subData.map((element) => {
            if (categoryName !== "all") {
              if (element.category_name === categoryName) {
                if (isCategoryEmpty) {
                  setIsCategoryEmpty(false);
                }
                return (
                  <SubVideo
                    likeData={likeData}
                    trigger={trigger}
                    setTrigger={setTrigger}
                    data={element}
                    key={element.video_id}
                    previousVideoSubRef={previousVideoSubRef}
                  />
                );
              }
            } else {
              if (isCategoryEmpty) {
                setIsCategoryEmpty(false);
              }
              return (
                <SubVideo
                  likeData={likeData}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  data={element}
                  key={element.video_id}
                  previousVideoSubRef={previousVideoSubRef}
                />
              );
            }
          })
        ) : (
          <div className='no-content'>
            {isCategoryEmpty ? setIsCategoryEmpty(false) : null}
            <span
              className='material-symbols-outlined'
              style={{ fontSize: "100px", color: "#aaaaaa" }}>
              notifications
            </span>
            <div className='no-content-text'>
              Subscribe to your favorite channels to get notified about their latest
              videos
            </div>
          </div>
        )}
        {isCategoryEmpty && !isLoading ? (
          <div className='no-content'>
            <span
              className='material-symbols-outlined'
              style={{ fontSize: "100px", color: "#aaaaaa" }}>
              notifications
            </span>
            <div className='no-content-text'>
              Subscribe to your favorite channels to get notified about their latest
              videos
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export default Subscriptions;
