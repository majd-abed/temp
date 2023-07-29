import millify from "millify";
import React, { useRef, useState } from "react";

const LandingVideo = ({ data, previousLandingVideoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef(null);

  const handlePlay = () => {
    if (previousLandingVideoRef.current) {
      previousLandingVideoRef.current.pause();
    }
    previousLandingVideoRef.current = videoRef.current;
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
  };
  const handleMute = () => {
    videoRef.current.muted = true;
    setIsMuted(true);
  };
  const handleUnMute = () => {
    videoRef.current.muted = false;
    setIsMuted(false);
  };
  return (
    <div style={{ width: "210px", margin: "auto", maxWidth: "100%" }}>
      <div className='user-details'>
        <div className='landing-user-propic'>
          <img
            src={
              data.profile_pic === null
                ? require("../assets/images/propic.png")
                : data.profile_pic
            }
            alt='prop'
            className='propic'
          />
        </div>
        <div className='landing-user-info'>
          <h5>{data.name}</h5>
          <span style={{ fontWeight: "400", fontSize: "11px" }}>
            {data.country_name}
          </span>
          <span className='small-note'>
            {data.subscriptions === "0"
              ? " No subscribes"
              : data.subscriptions === "1"
              ? " 1 Subscribe"
              : `   ${millify(parseInt(data.subscriptions))} Subscribes`}
          </span>
        </div>
      </div>
      <p className='landing-video-topic'>{data.keywords}</p>
      <div className='landing-video-container'>
        <video
          ref={videoRef}
          src={data.video}
          className='video'
          onClick={() => handlePause()}
          onEnded={() => setIsReplay(true)}
        />
        {/* ------------ control buttons -------- */}
        <div className='control-btns'>
          <button
            className='material-symbols-rounded control-btn-style'
            style={{ display: `${isPlaying || isReplay ? "none" : "flex"}` }}
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
          <button
            className='subscribe'
            onClick={() => {
              window.location = "/signin";
            }}>
            Subscribe
          </button>
          <div className='video-info'>
            <button
              className='vid-btn'
              onClick={() => {
                window.location = "/signin";
              }}>
              <span
                className='material-symbols-outlined'
                style={{ paddingTop: "15px", color: "white" }}>
                favorite
              </span>
            </button>
            <br />
            {data.likes ? millify(data.likes) : 0}
            <br />
            <button
              className='vid-btn'
              onClick={() => {
                window.location = "/signin";
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
  );
};

export default LandingVideo;
