import React from "react";

const BackArrow = () => {
  return (
    <button className='nav-btn'>
      {" "}
      <img
        src={require("../assets/images/back.png")}
        alt=''
        className='arrow-back'
      />
      Back{" "}
    </button>
  );
};

export default BackArrow;
