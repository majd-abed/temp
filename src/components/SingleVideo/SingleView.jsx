import React, { useEffect, useRef, useState } from "react";
import Faqs from "./Faqs";
import { useLocation } from "react-router-dom";
import millify from "millify";
import { HOME, MY_SUBSCRIPTIONS, http } from "../../api";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useGlobal } from "../../context";
const SingleView = () => {
  const [toggleFaqs, setToggleFaqs] = useState(true);
  const location = useLocation();
  const data = location.state;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFaqsOpen, setIsFaqsOpen] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [faqsTrigger, setFaqsTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [Comment, setComment] = useState("");
  const [subData, setSubData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [isSubLoading, setIsSubLoading] = useState(true);
  const videoRef = useRef(null);
  const faqsRef = useRef();

  const { homeData, isHomeLoading, userInfo } = useGlobal();

  const filterSubdata = (data, id) => {
    let tem = data.filter((e) => e.user_id === id);
    return tem[0].subscription_id;
  };
  // const filterLikedata = (data, user, vid) => {
  //   let tem = data.filter((e) => e.user_id === user && e.video_id === vid);
  //   return tem;
  // };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleComment = (id) => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    if (Comment === "") return;
    axios
      .post(
        `https://beta-api-live.s360.cloud/api/videos/question/${id}`,
        { comments: Comment },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((success) => {
        setFaqsTrigger(!faqsTrigger);
        setComment("");
        toast.success("Comment submitted successfully");
        setTimeout(() => {
          faqsRef.current?.scrollTo({
            top: 999999,
            behavior: "smooth",
          });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };
  const handleReplay = () => {
    videoRef.current.play();
    setIsReplay(false);
  };
  const handlePause = () => {
    videoRef.current.pause();
    if (!isReplay) setIsPlaying(false);
    setIsFaqsOpen(false);
  };
  const handleMute = () => {
    videoRef.current.muted = true;
    setIsMuted(true);
  };
  const handleUnMute = () => {
    videoRef.current.muted = false;
    setIsMuted(false);
  };
  async function handleSub(id) {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http.get("/sanctum/csrf-cookie");
    await axios
      .post(`https://beta-api-live.s360.cloud/api/subscribe/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Subscribed!");
          setTrigger(!trigger);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function handleUnSub(id) {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http.get("/sanctum/csrf-cookie");
    await axios
      .delete(`https://beta-api-live.s360.cloud/api/mysubscriptions/remove/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Unsubscribed!");
          setTrigger(!trigger);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function handleLike(id) {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http.get("/sanctum/csrf-cookie");
    await axios
      .post(
        `https://beta-api-live.s360.cloud/api/videos/like/${id}`,
        {
          video_id: data.video_id,
          status: 0,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Video is Liked!");
          setIsLiked(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(`https://beta-api-live.s360.cloud/api/videos/faqs/${data.video_id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.faqs;
        setFaqData(data);
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
  }, [faqsTrigger, trigger]);

  return (
    <div className='single-view-container'>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "white",
            color: "black",
          },
          // Default options for specific types
          success: {
            duration: 5000,
            theme: {
              primary: "#B9F9C7",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#FEB8B8",
              color: "black",
            },
          },
        }}
      />
      <div className='single-view-video-container'>
        <div className='single-view-video'>
          {toggleFaqs ? <Faqs setToggleFaqs={setToggleFaqs} /> : null}
          <div className='single-view-top'>
            <div className='single-view-img'>
              <img
                src={
                  data.profile_pic === null
                    ? require("../../assets/images/propic.png")
                    : data.profile_pic
                }
                alt='prop'
                className='propic'
              />
            </div>
          </div>
          {/* <div className='single-view-video-icon'>
            <img
            src={require("../../../assets/images/video-button.png")}
            alt=''
            className='w-100'
          />
          </div> */}
          <div className='single-container'>
            <video
              ref={videoRef}
              src={data.video}
              className='single-video'
              onClick={() => handlePause()}
              onEnded={() => setIsReplay(true)}
            />
            {/* ------------ control buttons -------- */}
            <div className='control-btns'>
              <button
                className='material-symbols-rounded control-btn-style'
                style={{ display: `${isPlaying || isReplay ? "none" : "block"}` }}
                onClick={handlePlay}>
                play_arrow
              </button>
              <button
                className='material-symbols-rounded control-btn-style'
                style={{ display: `${isReplay ? "block" : "none"}` }}
                onClick={handleReplay}>
                replay
              </button>
            </div>
            {/* ------------ mute button -------- */}
            <div className='single-mute-container'>
              <button
                className='material-symbols-rounded mute-btn-style'
                style={{ display: `${isMuted ? "block" : "none"}` }}
                onClick={handleUnMute}>
                volume_off
              </button>
              <button
                className='material-symbols-rounded mute-btn-style'
                style={{ display: `${isMuted ? "none" : "block"}` }}
                onClick={handleMute}>
                volume_up
              </button>
            </div>
            {/* ------------ video buttons -------- */}
            <div className='single-video-btns'>
              <div className='video-info'>
                {likeData ? (
                  likeData.find(
                    (e) =>
                      e.video_id === data.video_id && e.user_id === userInfo.user_id
                  ) ? (
                    <span
                      className='material-symbols-rounded'
                      style={{ paddingTop: "15px", color: "#f04c68" }}>
                      favorite
                    </span>
                  ) : isLiked ? (
                    <span
                      className='material-symbols-rounded'
                      style={{ paddingTop: "15px", color: "#f04c68" }}>
                      favorite
                    </span>
                  ) : (
                    <button
                      className='vid-btn'
                      onClick={() => handleLike(data.video_id)}>
                      <span
                        className='material-symbols-outlined'
                        style={{ paddingTop: "15px", color: "white" }}>
                        favorite
                      </span>
                    </button>
                  )
                ) : (
                  <button
                    className='vid-btn'
                    onClick={() => handleLike(data.video_id)}>
                    <span
                      className='material-symbols-outlined'
                      style={{ paddingTop: "15px", color: "white" }}>
                      favorite
                    </span>
                  </button>
                )}
                <br />
                {data.likes
                  ? millify(isLiked ? parseInt(data.likes) + 1 : data.likes)
                  : isLiked
                  ? 1
                  : 0}
                <br />
                <button
                  className='vid-btn'
                  onClick={() => {
                    setIsFaqsOpen(!isFaqsOpen);
                  }}>
                  <span
                    className='material-symbols-outlined'
                    style={{ paddingTop: "15px", color: "white" }}>
                    chat
                  </span>
                </button>
                <br />
                {data.comments ? millify(data.comments) : 0}
                <br />
              </div>
            </div>
          </div>
          <div className='single-view-bottom'>
            {subData ? (
              subData.find((e) => e.user_id === data.user_id) ? (
                <button
                  className='single-subscribed'
                  onClick={() => {
                    handleUnSub(filterSubdata(subData, data.user_id));
                    // filterSubdata(subData, data.user_id);
                  }}>
                  Subscribed
                </button>
              ) : (
                <button
                  className='single-subscribe'
                  onClick={() => handleSub(data.user_id)}>
                  Subscribe
                </button>
              )
            ) : (
              <button
                className='single-subscribe'
                onClick={() => handleSub(data.user_id)}>
                Subscribe
              </button>
            )}
            <p className='single-view-category'>{data.category_name}</p>
            <p className='single-view-description'>{data.keywords}</p>
            <p className='single-view-user'>
              {data.name}, {data.country_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleView;
