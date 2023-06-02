import React, { useEffect, useState } from "react";
import { HOME, http, MY_SUBSCRIPTIONS } from "../../api";

import Footer from "../Footer";
import HomeVideo from "./HomeVideo";
import Spinner from "../Spinner";
import { useGlobal } from "../../context";

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
  } = useGlobal();
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
        // console.log("likes", data);
        setLikeData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [trigger]);
  useEffect(() => {
    console.log("home", homeData);
  }, [homeData, subData, categoryName, likeData]);
  return (
    <>
      <div className='angel-container'>
        {isHomeLoading || isSubLoading ? (
          <div className='home-spinner'>
            <Spinner />
          </div>
        ) : homeData ? (
          homeData.map((element) => {
            console.log(element, element.is_live);
            if (element.is_live === "1") {
              if (categoryName !== "all") {
                console.log(element, element.category_name, categoryName);
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
                console.log(element, element.category_name, categoryName);
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
        ) : (
          <div className='no-content'>
            <img src={require("../../assets/images/no-video.png")} alt='' />
            <div>No Videos to show here11111</div>
          </div>
        )}
        {isCategoryEmpty && !isHomeLoading && !isSubLoading ? (
          <div className='no-content'>
            {console.log(isCategoryEmpty, isHomeLoading, isSubLoading)}
            <img src={require("../../assets/images/no-video.png")} alt='' />
            <div>No Videos to show here222222</div>
          </div>
        ) : (
          console.log("last")
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
