import React, { useState } from "react";
import Faqs from "./Faqs";
import { useLocation } from "react-router-dom";
import millify from "millify";
const SingleView = () => {
  const [toggleFaqs, setToggleFaqs] = useState(true);
  const location = useLocation();
  const data = location.state;
  return (
    <div className='single-view-container'>
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
            <div
              className='single-view-interact'
              onClick={() => setToggleFaqs(true)}>
              <span className='material-symbols-outlined'>favorite</span>
              <p>{data.likes ? millify(parseInt(data.likes)) : 0}</p>
              <span className='material-symbols-outlined'>chat</span>
              <p>{data.comments ? millify(data.comments) : 0}</p>
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
              // ref={videoRef}
              src={data.video}
              className='single-video'
              // onClick={() => handlePause()}
              // onEnded={() => setIsReplay(true)}
            />
          </div>
          <div className='single-view-bottom'>
            <button className='single-view-follow'>Follow</button>
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
