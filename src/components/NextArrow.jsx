import React from "react";

const NextArrow = () => {
  return (
    <button className='nav-btn'>
      {" "}
      Next 
      <img
        src={require("../assets/images/next.png")}
        alt=''
        className='arrow-next'
      />
    </button>
  );
};

export default NextArrow;
