import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const emailRef = useRef(null);
  const PasswordRef = useRef(null);

  async function handleEmail() {
    await axios
      .post("https://beta-api-test.s360.cloud/api/forget/password", {
        form_id: 1,
        email: emailRef.current.value,
      })
      .then((res) => {
        console.log(res);
        if (res.data.messsage !== "Email Not Found!") {
          setStep(2);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.messsage);
        }
        setTimeout(() => {
          // window.location.reload();
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // const handleEmail = () => {
  //   console.log(emailRef.current.value);
  //   setStep(2);
  // };
  const handleOtp = () => {
    console.log(otp);
    setStep(3);
  };
  const handleDone = () => {
    console.log(PasswordRef.current.value);
    setStep(1);
  };

  // const validateEmail = (mail) => {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
  //     return true;
  //   }
  //   return false;
  // };

  // useEffect(() => {}, [step]);
  return (
    <div style={{ maxWidth: "1200px", margin: "auto" }}>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "white",
            color: "black",
          },
          // Default options for specific types
          success: {
            duration: 5000,
            theme: {
              primary: "#B9F9C7",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#FEB8B8",
              color: "black",
            },
          },
        }}
      />
      <div>
        <Link to='/' className='back-arrow'>
          <span className='material-symbols-outlined back-arrow-symbol'>
            arrow_back
          </span>
        </Link>
      </div>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <div className='logo-container'>
          <img src={require("../assets/images/wow_logo.png")} alt='logo' />
        </div>
        {step === 1 ? (
          <div className='enter-email-container'>
            <p className='otp-text'>
              Please Enter your Email to reset your password
            </p>
            <input
              ref={emailRef}
              type='text'
              className='otp-input'
              placeholder='Email'
            />
            <button
              className='opt-btn'
              onClick={() => {
                handleEmail();
              }}>
              Next
            </button>
          </div>
        ) : null}
        {step === 2 ? (
          <div className='otp-container'>
            <p className='otp-text-info'>
              An email has been sent to your email address containing OTP. If you do
              not receive the email within a few minutes, please check your spam
              folder.
            </p>
            <p className='otp-text'>Please Enter Validation Code</p>
            <OtpInput
              inputType='tel'
              inputStyle='inputStyle'
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
            />
            <button
              className='opt-btn'
              disabled={otp.length < 4}
              onClick={() => {
                handleOtp();
              }}>
              Verify
            </button>
          </div>
        ) : null}
        {step === 3 ? (
          <div className='enter-password-container'>
            <p className='otp-text'>Please Enter your new password</p>
            <input
              ref={PasswordRef}
              type='text'
              className='otp-input'
              placeholder='New Password'
            />
            <button
              className='opt-btn'
              onClick={() => {
                handleDone();
              }}>
              Done
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPassword;
