import axios from "axios";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";
import { Link, Navigate } from "react-router-dom";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [credential, setCredential] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isPassIndetical, setIsPassIndetical] = useState(true);
  const [emailWarning, setEmailWarning] = useState(false);

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  async function handleEmail() {
    if (!validateEmail(emailRef.current.value)) return setEmailWarning(true);
    await axios
      .post("https://beta-api-test.s360.cloud/api/forget/password", {
        form_id: 1,
        email: emailRef.current.value,
      })
      .then((res) => {
        if (res.data.messsage !== "Email Not Found!") {
          setStep(2);
        } else {
          toast.error(res.data.messsage);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function handleOtp() {
    await axios
      .post("https://beta-api-test.s360.cloud/api/forget/password", {
        form_id: 2,
        otp: otp,
      })
      .then((res) => {
        if (res.data.message !== "Invalid OTP") {
          toast.success(res.data.message);
          setCredential(res.data.credential);
          setStep(3);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function handleDone() {
    if (!passwordRef.current.value || passwordRef.current.value.length < 8)
      setIsPasswordShort(true);
    if (passwordRef.current.value !== ConfirmPasswordRef.current.value)
      setIsPassIndetical(false);
    if (
      !passwordRef.current.value ||
      passwordRef.current.value.length < 8 ||
      passwordRef.current.value !== ConfirmPasswordRef.current.value
    )
      return null;
    await axios
      .post("https://beta-api-test.s360.cloud/api/forget/password", {
        form_id: 3,
        credential: credential,
        new_password: passwordRef.current.value,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location = "/signin";
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  if (localStorage.getItem("token") || sessionStorage.getItem("token"))
    return <Navigate to='/' replace={true} />;
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
          duration: 3000,
          style: {
            background: "white",
            color: "black",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "#B9F9C7",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
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
          <img src={require("../assets/images/olyoli-logo.png")} alt='logo' />
        </div>
        {step === 1 ? (
          <div className='enter-email-container'>
            <p className='otp-text'>
              Please Enter your Email to reset your password
            </p>
            <input
              ref={emailRef}
              type='email'
              className='otp-input'
              placeholder='Email'
              onChange={() => setEmailWarning(false)}
            />
            {emailWarning ? (
              <div className='require-otp'>Email is not valid</div>
            ) : null}
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
              ref={passwordRef}
              type='password'
              className='otp-input'
              placeholder='New Password'
              onChange={() => {
                setIsPasswordShort(false);
                setIsPassIndetical(true);
              }}
            />
            <input
              ref={ConfirmPasswordRef}
              type='password'
              className='otp-input'
              placeholder='Confirm Password'
              onChange={() => {
                setIsPasswordShort(false);
                setIsPassIndetical(true);
              }}
            />
            {isPasswordShort && isPassIndetical ? (
              <div className='require-otp'>
                Password must contain at least 8 characters
              </div>
            ) : null}
            {!isPassIndetical ? (
              <div className='require-otp'>
                Password confirmation doesn't match password
              </div>
            ) : null}
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
