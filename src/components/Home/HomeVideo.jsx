import React, { useState } from "react";
import millify from "millify";
import { useGlobal } from "../../context";
import { Link } from "react-router-dom";
const HomeVideo = ({
  data,
  subData,
  likeData,
  trigger,
  setTrigger,
  previousVideoRef,
}) => {
  const { userInfo } = useGlobal();

  return (
    <Link to={data.video_id} className='video-card'>
      <div className='video-card-top'>
        <div className='video-card-img'>
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
        <div className='video-card-interact'>
          <div className='video-card-info'>
            {likeData ? (
              likeData.find(
                (e) => e.video_id === data.video_id && e.user_id === userInfo.user_id
              ) ? (
                <span
                  className='material-symbols-rounded'
                  style={{ paddingTop: "10px", color: "#f04c68", fontSize: "18px" }}>
                  favorite
                </span>
              ) : (
                <button className='vid-btn'>
                  <span
                    className='material-symbols-outlined'
                    style={{ paddingTop: "10px", color: "white", fontSize: "18px" }}>
                    favorite
                  </span>
                </button>
              )
            ) : (
              <button className='vid-btn'>
                <span
                  className='material-symbols-outlined'
                  style={{ paddingTop: "10px", color: "white", fontSize: "18px" }}>
                  favorite
                </span>
              </button>
            )}
            <br />
            <span style={{ color: "white" }}>
              {data.likes ? millify(parseInt(data.likes)) : 0}
            </span>
            <br />
            <button className='vid-btn' onClick={() => {}}>
              <span
                className='material-symbols-outlined'
                style={{ paddingTop: "5px", color: "white", fontSize: "18px" }}>
                chat
              </span>
            </button>
            <br />
            <span style={{ color: "white" }}>
              {data.comments ? millify(data.comments) : 0}
            </span>
            <br />
          </div>
        </div>
      </div>
      <div className='video-card-container'>
        <video
          // ref={videoRef}
          src={data.video}
          className='video'
          // onClick={() => handlePause()}
          // onEnded={() => setIsReplay(true)}
        />
        <button className='material-symbols-rounded video-play-btn'>
          play_arrow
        </button>
      </div>

      <div className='video-card-bottom'>
        <p className='video-card-category'>{data.category_name}</p>
        <p className='video-card-date'>Uploaded on: {data.created_at}</p>
        <p className='video-card-description'>{data.keywords}</p>
        <p className='video-card-user'>
          {data.name}, {data.country_name}
        </p>
      </div>
    </Link>
  );
};

export default HomeVideo;
