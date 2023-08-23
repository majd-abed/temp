import React, { useState } from "react";
import Faqs from "./Faqs";
import { useLocation, useParams } from "react-router-dom";
const SingleView = () => {
  const [toggleFaqs, setToggleFaqs] = useState(true);
  const { vidId } = useParams();
  const location = useLocation();
  const state = location.state;
  return (
    <div className='single-view-container'>
      {console.log(state)}
      <div className='single-view-video-container'>
        <div className='single-view-video'>
          {toggleFaqs ? <Faqs setToggleFaqs={setToggleFaqs} /> : null}
          <div className='single-view-top'>
            <div className='single-view-img'>
              <img src='' alt='' />
            </div>
            <div
              className='single-view-interact'
              onClick={() => setToggleFaqs(true)}>
              <span className='material-symbols-outlined'>favorite</span>
              <p>3K</p>
              <span className='material-symbols-outlined'>chat</span>
              <p>3K</p>
            </div>
          </div>
          <div className='single-view-video-icon'>
            {/* <img
            src={require("../../../assets/images/video-button.png")}
            alt=''
            className='w-100'
          /> */}
          </div>
          <div className='single-view-bottom'>
            <button className='single-view-follow'>Follow</button>
            <p className='single-view-category'>Electronics</p>
            <p className='single-view-description'>
              Popular belief, Lorem is simply random text.
            </p>
            <p className='single-view-user'>Gluetron eBusiness, India.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleView;
