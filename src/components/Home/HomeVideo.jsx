import React from "react";

const HomeVideo = ({
  data,
  subData,
  likeData,
  trigger,
  setTrigger,
  previousVideoRef,
}) => {
  return (
    <div className='video-card'>
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
          <div className='video-info'>
            {likeData ? (
              likeData.find(
                (e) => e.video_id === data.video_id && e.user_id === userInfo.user_id
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
              <button className='vid-btn' onClick={() => handleLike(data.video_id)}>
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
        <p className='video-card-date'>Starts on: 5th August 2023 @ 4:00PM IST</p>
        <p className='video-card-description'>{data.keywords}</p>
        <p className='video-card-user'>
          {data.name}, {data.country_name}
        </p>
      </div>
    </div>
  );
};

export default HomeVideo;
