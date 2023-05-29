import React from "react";

const Progressbar = ({ progress }) => {
  const Parentdiv = {
    height: "10px",
    width: "200px",
    margin: "auto",
    backgroundColor: "var(--primary-color)",
    borderRadius: 40,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "var(--secondary-color)",
    borderRadius: 40,
    textAlign: "right",
    transitionDuration:'300ms'
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}></div>
    </div>
  );
};

export default Progressbar;
