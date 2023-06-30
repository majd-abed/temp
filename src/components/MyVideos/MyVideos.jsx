import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { http, MY_VIDEOS } from "../../api";
import { useGlobal } from "../../context";

import Footer from "../Footer";
import Spinner from "../Spinner";
import MyVideosVideo from "./MyVideosVideo";

const MyVideos = () => {
  const {
    vidData,
    setVidData,
    categoryName,
    setCategoryName,
    isCategoryEmpty,
    setIsCategoryEmpty,
    setSelectedCategory,
  } = useGlobal();

  // const categoryRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [likeData, setLikeData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const handleChange = (e) => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    if (e.target.value === "newest") {
      setIsLoading(true);
      http
        .get("/api/myvideos/newest-to-oldest", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((res) => {
          const data = res.data.myvideos;
          setVidData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (e.target.value === "oldest") {
      setIsLoading(true);
      http
        .get("/api/myvideos/oldest-to-newest", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((res) => {
          const data = res.data.myvideos;
          setVidData(data);
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
      .get(MY_VIDEOS, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.myvideos;
        setVidData(data);
        setIsLoading(false);
        setCategoryName("all");
        setSelectedCategory(0);
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
  useEffect(() => {}, [vidData, categoryName, likeData]);
  if (!localStorage.getItem("token") && !sessionStorage.getItem("token"))
    return <Navigate to='/' replace={true} />;
  return (
    <>
      <div className='angel-container-list'>
        <div className='top-sub-menu'>
          <div className='angel-top-sub-nav-divider-left'>
            <Link
              to='/subscriptions'
              className='secondary-btn'
              value=''
              onClick={() => setSelectedCategory(0)}
              style={{ marginRight: "5px" }}>
              Subscriptions
            </Link>
            <Link className='primary-btn'>My Videos</Link>
          </div>
          <div className='angel-top-sub-nav-divider-right'>
            {vidData ? (
              <select
                className='select-filter-option'
                onChange={handleChange}
                >
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
        ) : vidData ? (
          vidData.map((element) => {
            if (categoryName !== "all") {
              if (element.category_name === categoryName) {
                if (isCategoryEmpty) {
                  setIsCategoryEmpty(false);
                }
                return (
                  <MyVideosVideo
                    likeData={likeData}
                    trigger={trigger}
                    setTrigger={setTrigger}
                    data={element}
                    key={element.video_id}
                  />
                );
              }
            } else {
              if (isCategoryEmpty) {
                setIsCategoryEmpty(false);
              }
              return (
                <MyVideosVideo
                  likeData={likeData}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  data={element}
                  key={element.video_id}
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
            <div style={{ marginBottom: "20px" }}>Your Videos live here</div>
            <div>
              <Link to='/video-post' className='upload-btn'>
                Upload Video
              </Link>
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
            <div>Your Videos live here</div>
            <div>
              <Link to='/video-post' className=''>
                Upload Video
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default MyVideos;
