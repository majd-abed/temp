import axios from "axios";
import millify from "millify";
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { http } from "../../api";
import { useGlobal } from "../../context";

const SubVideo = ({ data, trigger, setTrigger, likeData, previousVideoSubRef }) => {
  const [sub, setSub] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFaqsOpen, setIsFaqsOpen] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [faqsTrigger, setFaqsTrigger] = useState(false);
  const [Comment, setComment] = useState("");

  const { userInfo } = useGlobal();

  const videoRef = useRef(null);
  const faqsRef = useRef();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handlePlay = () => {
    if (previousVideoSubRef.current) {
      previousVideoSubRef.current.pause();
    }
    previousVideoSubRef.current = videoRef.current;

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
    // videoRef.current.volume = 1;
    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;
    setIsMuted(true);
  };
  const handleUnMute = () => {
    // videoRef.current.volume = 0;
    videoRef.current.defaultMuted = false;
    videoRef.current.muted = false;
    setIsMuted(false);
  };

  async function handleSub(id) {
    setSub(true);
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http.get("/sanctum/csrf-cookie");
    await axios
      .post(`https://beta-api-test.s360.cloud/api/subscribe/${id}`, {
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
    setSub(false);
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http.get("/sanctum/csrf-cookie");
    await axios
      .delete(`https://beta-api-test.s360.cloud/api/mysubscriptions/remove/${id}`, {
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
        `https://beta-api-test.s360.cloud/api/videos/like/${id}`,
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

  const handleComment = (id) => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    if (Comment === "") return;

    axios
      .post(
        `https://beta-api-test.s360.cloud/api/videos/question/${id}`,
        { comments: Comment },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((success) => {
        setFaqsTrigger(!faqsTrigger);
        setTrigger(!trigger);
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

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(`https://beta-api-test.s360.cloud/api/videos/faqs/${data.video_id}`, {
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
  }, [faqsTrigger]);

  return (
    <div className='video-list-group'>
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
      <div style={{ width: "400px", margin: "auto", maxWidth: "100%" }}>
        <div className='user-details'>
          <div className='user-propic'>
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
          <div className='user-info'>
            <h5>{data.name}</h5>
            <span style={{ fontWeight: "400", fontSize: "11px" }}>
              {data.country_name}
            </span>
            <span className='small-note'>
              {data.subscriptions === "0"
                ? " No subscribes"
                : data.subscriptions === "1"
                ? " 1 Subscribe"
                : ` ${millify(parseInt(data.subscriptions))} Subscribes`}
            </span>
          </div>
        </div>
        <p className='video-topic'>{data.keywords}</p>
        <div className='video-container'>
          <video
            ref={videoRef}
            src={data.video}
            className='video'
            onClick={() => handlePause()}
            onEnded={() => setIsReplay(true)}
          />
          {/* ------------ FAQs modal ----------- */}
          <div
            className='faqs-modal'
            style={{ display: `${isFaqsOpen ? "block" : "none"}` }}>
            <div className='faqs-header'>
              <h4 className='faqs-header-text'>FAQs</h4>
              <button
                className='faqs-close-btn'
                onClick={() => setIsFaqsOpen(!isFaqsOpen)}>
                <span className='material-symbols-outlined'>close</span>
              </button>
            </div>
            <div className='faqs-container' ref={faqsRef}>
              {faqData.map((f) => {
                return f.user_id !== null ? (
                  <>
                    <div className='' key={f.question_id}>
                      <details>
                        <summary>
                          <div className='question-container'>
                            <div>
                              <div className='profile-pic-container'>
                                <img
                                  src={
                                    f.profile_pic === null
                                      ? require("../../assets/images/propic.png")
                                      : f.profile_pic
                                  }
                                  className='profile-pic'></img>
                              </div>
                            </div>
                            <div className='question-info'>
                              <div className='question-username'>
                                {f["Asked By"]}
                              </div>
                              <div className='question-country'>
                                {f.country_name}
                              </div>
                              <div className='question-faq'>{f.question}</div>
                            </div>
                          </div>
                        </summary>
                        <div>
                          {f.answer ? (
                            <div className='answer'>
                              <p>{f.answer}</p>
                            </div>
                          ) : (
                            <div className='no-answer'>
                              <p>No replies yet</p>
                            </div>
                          )}
                        </div>
                      </details>
                    </div>
                  </>
                ) : null;
              })}
            </div>
            <div className='comment-section'>
              <div className='comment'>
                <textarea
                  value={Comment}
                  maxLength={50}
                  onChange={handleCommentChange}
                  name=''
                  id=''
                  rows='1'
                  placeholder='Your Comment...'></textarea>
                <div className='comment-container'>
                  <div>
                    <button
                      className='submit-comment'
                      onClick={() => handleComment(data.video_id)}>
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <div className='mute-container'>
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
          <div className='video-btns'>
            {sub ? (
              <button
                className='subscribed'
                onClick={() => {
                  handleUnSub(data.subscription_id);
                }}>
                Subscribed
              </button>
            ) : (
              <button
                className='subscribe'
                onClick={() => handleSub(data.subscription_id)}>
                Subscribe
              </button>
            )}
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
              {/* <br />
            {data.comments ? data.comments : 0}
            <br />
            <span
              className='material-symbols-outlined'
              style={{ paddingTop: "15px", color: "white" }}>
              share
            </span>
            <br />
            {data.shares ? data.shares : 0} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubVideo;
