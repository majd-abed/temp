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
        <div className='video-card-interact'></div>
      </div>
      <div className='video-card-container'>
        <video
          // ref={videoRef}
          src={data.video}
          className='video'
          // onClick={() => handlePause()}
          // onEnded={() => setIsReplay(true)}
        />
        <button
            className='material-symbols-rounded control-btn-style'>
            play_arrow
          </button>
      </div>

      <div className='video-card-bottom'>
        <p className='video-card-category'>Electronics</p>
        <p className='video-card-date'>Starts on: 5th August 2023 @ 4:00PM IST</p>
        <p className='video-card-description'>
          Popular belief, Lorem is simply random text.
        </p>
        <p className='video-card-user'>Gluetron eBusiness, India.</p>
      </div>
    </div>
  );
};

export default HomeVideo;
