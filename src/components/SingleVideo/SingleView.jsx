import React from "react";
import SingleViewVideo from "./SingleViewVideo";
import BackArrow from "../BackArrow";
import NextArrow from "../NextArrow";
const SingleView = () => {
  return (
    <div className='single-view-container'>
      <SingleViewVideo />
      {/* <div className='single-view-nav'>
        <div className='d-flex flex-column justify-content-center'>
          <BackArrow />
        </div>
        <button className='single-view-home-btn'>HOME</button>
        <div className='d-flex flex-column justify-content-center'>
          <NextArrow />
        </div>
      </div> */}
    </div>
  );
};

export default SingleView;
