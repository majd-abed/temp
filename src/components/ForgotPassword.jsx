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
  const confirmPasswordRef = useRef(null);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isPassIndetical, setIsPassIndetical] = useState(true);
  const [emailWarning, setEmailWarning] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  function validatePassword(password) {
    // Regular expressions for each requirement
    const lengthRegex = /^.{8,}$/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const symbolRegex = /[\W_]/;
    const numberRegex = /\d/;

    // Checking each requirement using regular expressions
    const hasLength = lengthRegex.test(password);
    const hasUpperCase = upperCaseRegex.test(password);
    const hasLowerCase = lowerCaseRegex.test(password);
    const hasSymbol = symbolRegex.test(password);
    const hasNumber = numberRegex.test(password);

    // Returning true if all requirements are met, false otherwise
    return hasLength && hasUpperCase && hasLowerCase && hasSymbol && hasNumber;
  }

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
    if (!validatePassword(passwordRef.current.value)) setIsPasswordInvalid(true);
    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      setIsPassIndetical(false);
    if (
      !validatePassword(passwordRef.current.value) ||
      passwordRef.current.value !== confirmPasswordRef.current.value
    )
      return null;
    await axios
      .post("https://beta-api-test.s360.cloud/api/forget/password", {
        form_id: 3,
        credential: credential,
        new_password: passwordRef.current.value,
        password_confirmation: confirmPasswordRef.current.value,
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
            <p className='otp-text opt-text-margin'>
              Please Enter your Email to reset your password
            </p>
            <div class='input-group'>
              <input
                type='text'
                className='input'
                ref={emailRef}
                onChange={() => {
                  setEmailWarning(false);
                }}
                // required
                placeholder='.'
                id='email-signin'
              />
              <label for='email-signin' className='input-label'>
                E-mail Address
              </label>
              {emailWarning ? (
                <div className='require-otp'>Email is not valid</div>
              ) : null}
            </div>

            <button
              className='otp-btn-email'
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
              className='otp-btn'
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
            <div class='input-group'>
              <input
                type={isShowPass ? "text" : "password"}
                className='input'
                ref={passwordRef}
                onChange={() => {
                  setIsPasswordInvalid(false);
                  setIsPassIndetical(true);
                }}
                // required
                placeholder='.'
                id='password-signin'
              />
              <label for='password-signin' className='input-label password-mobile'>
                Password
              </label>
              <span
                className='password-show'
                onClick={() => setIsShowPass(!isShowPass)}>
                {isShowPass ? (
                  <span class='material-symbols-outlined'>visibility_off</span>
                ) : (
                  <span class='material-symbols-outlined'>visibility</span>
                )}
              </span>
            </div>
            <div class='input-group'>
              <input
                type={isShowConfirmPass ? "text" : "password"}
                className='input'
                ref={confirmPasswordRef}
                onChange={() => {
                  setIsPasswordInvalid(false);
                  setIsPassIndetical(true);
                }}
                // required
                placeholder='.'
                id='confirmpassword'
              />
              <label for='confirmpassword' className='input-label password-mobile'>
                Confirm Password
              </label>
              <span
                className='password-show'
                onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}>
                {isShowConfirmPass ? (
                  <span class='material-symbols-outlined'>visibility_off</span>
                ) : (
                  <span class='material-symbols-outlined'>visibility</span>
                )}
              </span>
            </div>
            {/* <input
              ref={passwordRef}
              type='password'
              className='otp-input'
              placeholder='New Password'
              onChange={() => {
                setIsPasswordInvalid(false);
                setIsPassIndetical(true);
              }}
            />
            <input
              ref={ConfirmPasswordRef}
              type='password'
              className='otp-input'
              placeholder='Confirm Password'
              onChange={() => {
                setIsPasswordInvalid(false);
                setIsPassIndetical(true);
              }}
            /> */}
            {isPasswordInvalid && isPassIndetical ? (
              <div
                className='require-otp'
                style={{
                  textAlign: "start",
                  width: "fit-content",
                  marginLeft: "55px",
                }}>
                The password must contain:
                <p>- Minimum 8 characters</p>
                <p>- A mix of uppercase and lowercase letters</p>
                <p>- Symbols (special characters) </p>- At least one number
              </div>
            ) : null}
            {!isPassIndetical ? (
              <div className='require-otp'>
                Password confirmation doesn't match password
              </div>
            ) : null}
            <button
              className='otp-btn-done'
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
