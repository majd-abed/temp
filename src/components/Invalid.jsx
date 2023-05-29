import React from "react";
import { Link } from "react-router-dom";

const Invalid = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "40vh" }}>
      Invalid Link{" "}
      <Link to='/' style={{ fontWeight: "700", color: "var(--primary-btn-color)" }}>
        Click here{" "}
      </Link>
      to go back home
    </div>
  );
};

export default Invalid;
