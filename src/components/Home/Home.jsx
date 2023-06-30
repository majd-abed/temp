import React, { useEffect, useState } from "react";
import { HOME, http, MY_SUBSCRIPTIONS } from "../../api";

import Footer from "../Footer";
import HomeVideo from "./HomeVideo";
import Spinner from "../Spinner";
import { useGlobal } from "../../context";
import { Navigate } from "react-router-dom";

const Home = () => {
  const {
    homeData,
    setHomeData,
    categoryName,
    setCategoryName,
    isHomeLoading,
    setIsHomeLoading,
    isCategoryEmpty,
    setIsCategoryEmpty,
    isSearch,
    searchValue,
    noVideoPhrase,
  } = useGlobal();
  const searchPhrase = searchValue;
  const [subData, setSubData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [isSubLoading, setIsSubLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    if (isSearch === false)
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
        })
        .catch((e) => {
          console.log(e);
        });
    http
      .get(MY_SUBSCRIPTIONS, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data["my subscriptions"];
        setSubData(data);
        setIsSubLoading(false);
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
  useEffect(() => {}, [homeData, subData, categoryName, likeData]);
  if (!localStorage.getItem("token") && !sessionStorage.getItem("token"))
    return <Navigate to='/' replace={true} />;
  return (
    <>
      <div className='angel-container'>
        {isHomeLoading || isSubLoading ? (
          <div className='home-spinner '>
            <Spinner />
          </div>
        ) : homeData ? (
          homeData.map((element) => {
            if (element.is_live === 1) {
              if (categoryName !== "all") {
                if (element.category_name === categoryName) {
                  if (isCategoryEmpty) {
                    setIsCategoryEmpty(false);
                  }
                  return (
                    <HomeVideo
                      subData={subData}
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
                  <HomeVideo
                    subData={subData}
                    likeData={likeData}
                    trigger={trigger}
                    setTrigger={setTrigger}
                    data={element}
                    key={element.video_id}
                  />
                );
              }
            }
          })
        ) : isSearch ? (
          <div className='no-content'>
            <span class='material-symbols-outlined no-video-icon'>videocam_off</span>
            <div className='serif-font'>
              your search -{" "}
              <span
                className='serif-font'
                style={{ color: "black", fontWeight: "bold" }}>
                {noVideoPhrase}
              </span>{" "}
              - didn't match any videos
            </div>
          </div>
        ) : (
          <div className='no-content'>
            {isCategoryEmpty ? setIsCategoryEmpty(false) : null}
            <span class='material-symbols-outlined no-video-icon'>videocam_off</span>
            <div>No Videos to show here</div>
          </div>
        )}
        {isCategoryEmpty && !isHomeLoading && !isSubLoading ? (
          <div className='no-content'>
            {isSearch ? setIsCategoryEmpty(false) : null}
            <span class='material-symbols-outlined no-video-icon'>videocam_off</span>
            <div>No Videos to show here</div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default Home;
