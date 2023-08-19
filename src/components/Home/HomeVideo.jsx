import React from "react";

const HomeVideo = () => {
  return (
    <div className='video-card'>
      <div className='video-card-top'>
        <div className='video-card-img'>
          <img src='' alt='' />
        </div>
        <div className='video-card-interact'></div>
      </div>
      <div className='video-card-video'>
        <img
          src={require("../../../assets/images/video-button.png")}
          alt=''
          className='w-100'
        />
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
