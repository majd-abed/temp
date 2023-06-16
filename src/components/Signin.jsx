import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { http, SIGNIN } from "../api";
import toast, { Toaster } from "react-hot-toast";
const Signin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [check, setCheck] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const handlecheckbox = (e) => {
    setCheck(e.target.checked);
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
          if (check) localStorage.setItem("token", res.data?.token);
          else sessionStorage.setItem("token", res.data?.token);
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
    <>
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
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <div>
          <Link to='/' className='back-arrow'>
            <span className='material-symbols-outlined back-arrow-symbol'>
              arrow_back
            </span>
          </Link>
        </div>
        <form
          onSubmit={(e) => submit(e)}
          className='container'
          style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
          <div className='logo-container' style={{ marginBottom: "20px" }}>
            <img src={require("../assets/images/wow_logo.png")} alt='logo' />
          </div>
          <div className='form-floating mb-3' style={{ textAlign: "center" }}>
            <input
              type='email'
              className='form-control rounded-0 sign-input'
              id='floatingInput'
              placeholder='E-mail Address'
              ref={emailRef}
              onChange={() => {
                setEmailWarning(false);
              }}
              required
            />
            {emailWarning ? (
              <div
                className='require-sign'
                style={{ textAlign: "center", paddingBottom: "10px" }}>
                Email is not valid{" "}
              </div>
            ) : null}
          </div>
          <div className='form-floating' style={{}}>
            <input
              type='password'
              className='form-control rounded-0 sign-input'
              id='floatingPassword'
              placeholder='Password'
              ref={passwordRef}
              onChange={() => {
                setIsPasswordShort(false);
              }}
              required
            />
            {isPasswordShort ? (
              <div className='require-sign' style={{ textAlign: "center" }}>
                Password must contain at least 8 characters
              </div>
            ) : null}
          </div>
          <div className='options-container'>
            <div className='remember-form'>
              <input type='checkbox' onChange={handlecheckbox} />
              <span>Remember me</span>
            </div>
            <div className=''>
              <Link to='/forgot-password' className='forget-pass'>
                Forgot Password ?
              </Link>
            </div>
          </div>
          <div>
            <button
              className='sign-btn'
              style={{ backgroundColor: "black", color: "white" }}>
              Login
            </button>
          </div>
          <div className='signup-ask'>
            Don't have an account?
            <Link to='/signup' className='signup-ask-link'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
