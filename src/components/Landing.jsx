import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { http, SIGNIN } from "../api";
import toast, { Toaster } from "react-hot-toast";

const Landing = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef();

  const [emailWarning, setEmailWarning] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [showPassBtn, setShowPassBtn] = useState(false);
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  async function handleSignin() {
    if (!validateEmail(emailRef.current.value)) setEmailWarning(true);
    if (passwordRef.current.value.length < 8) setIsPasswordShort(true);
    if (
      !validateEmail(emailRef.current.value) ||
      passwordRef.current.value.length < 8
    )
      return null;
    await http.get("/sanctum/csrf-cookie");
    await http
      .post(SIGNIN, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data?.token);
          window.location = "/home";
        }
        if (res.status === 200) {
          toast.error(res.data.Message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const submit = (e) => {
    e.preventDefault();
    handleSignin();
  };
  return (
    <div className='landing-container'>
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
      <div className='landing-content'>
        <div className='landing-left'>
          <img src={require("../assets/images/landing-left-img.png")} alt='' />
        </div>
        <div className='landing-right'>
          <form onSubmit={(e) => submit(e)} className='landing-right-login'>
            <img
              className='landing-right-logo'
              src={require("../assets/images/olyoli-logo.png")}
              alt=''
            />
            <div className='input-group'>
              <input
                className='landing-right-input'
                type='email'
                name='email'
                ref={emailRef}
                maxLength={75}
                onChange={() => {
                  setEmailWarning(false);
                }}
                id='email-login'
                // required
                placeholder='.'
              />
              <label htmlFor='email-login' className='landing-input-label'>
                Phone number, username or email
              </label>
              {emailWarning ? (
                <div
                  className='require-sign'
                  style={{ textAlign: "start", paddingBottom: "10px" }}>
                  Email is not valid{" "}
                </div>
              ) : null}
            </div>
            <div className='input-group'>
              <input
                type={isShowPass ? "text" : "password"}
                className='landing-right-input'
                ref={passwordRef}
                onChange={() => {
                  setIsPasswordShort(false);
                  if (passwordRef.current.value.length) setShowPassBtn(true);
                  else setShowPassBtn(false);
                }}
                // required
                placeholder='.'
                id='password-login'
              />
              <label htmlFor='password-login' className='landing-input-label'>
                Password
              </label>
              {showPassBtn ? (
                <div
                  className='show-pass'
                  onClick={() => setIsShowPass(!isShowPass)}>
                  {!isShowPass ? "Show" : "Hide"}
                </div>
              ) : null}

              {isPasswordShort ? (
                <div className='require-sign' style={{ textAlign: "start" }}>
                  Password must contain at least 8 characters
                </div>
              ) : null}
            </div>
            <button className='landing-right-login-btn'>Log in</button>
            <div className='landing-right-or'>
              <div className='landing-right-line'></div>
              <p className='landing-right-or'>OR</p>
            </div>
            <div className='landing-right-facebook'>
              <img src={require("../assets/images/facebook-logo.png")} alt='' />
              <Link className='login-facebook'>Log in with Facebook</Link>
            </div>
            <Link to='/forgot-password' className='landing-forgot-password'>
              Forgot Password?
            </Link>
            <p className='landing-report'>
              You can also{" "}
              <Link className='landing-report'>
                report content you believe is unlawful
              </Link>{" "}
              in your country without logging in.
            </p>
          </form>
          <div className='landing-right-signup'>
            Don't have an account? <Link to='/signup'> Sign up</Link>
          </div>
          <p className='landing-right-app-text'>Get the app</p>
          <div className='landing-right-app'>
            <img src={require("../assets/images/google-play.png")} alt='' />
            <img src={require("../assets/images/microsoft.png")} alt='' />
          </div>
        </div>
      </div>
      <ul className='landing-footer'>
        <li>Meta</li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>Blog</li>
        <li>Jobs</li>
        <li>Help</li>
        <li>API</li>
        <li>
          <Link to='/privacy'>Privacy</Link>
        </li>
        <li>
          <Link to='/terms'>Terms</Link>
        </li>
        <li>Top Accounts</li>
        <li>Locations</li>
        <li>Instagram Lite</li>
        <li>Threads</li>
        <li>Contact Uploading & Non-Users</li>
        <li>Meta Verified</li>
      </ul>
      <ul className='landing-footer footer-margin'>
        <li>English</li>
        <li>© 2023 Instagram from Meta</li>
      </ul>
    </div>
  );
};

export default Landing;
