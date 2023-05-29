import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

const Validation = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className='m-auto' style={{ maxWidth: "1200px" }}>
      <div>
        <Link to='/' className='border-0 bg-transparent'>
          <span class='material-symbols-outlined fs-2 p-2 mt-3 bg-light rounded-circle'>
            arrow_back
          </span>
        </Link>
      </div>
      <div className='container' style={{ maxWidth: "600px" }}>
        <div className='d-flex justify-content-center'>
          <img src={require("../assets/logo.jpg")} alt='logo' />
        </div>
        <div class='container d-flex flex-column align-items-center'>
          <p className='text-danger'>Please Enter Validation Code</p>
          <OtpInput
            inputStyle='inputStyle'
            value={otp}
            onChange={setOtp}
            numInputs={7}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} />}
          />
          <button
            className='btn btn-success rounded-5 mt-3'
            disabled={otp.length < 7}
            style={{ backgroundColor: "#5034A1", color: "white", width: "21.2rem" }}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Validation;
