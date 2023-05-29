import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { http, SIGNIN } from "../api";

const Signin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [check, setCheck] = useState(false);

  const handlecheckbox = (e) => {
    setCheck(e.target.checked);
  };
  async function handleSignin() {
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
      <div className='parent clearfix'>
        <div className='bg-illustration'>
          <img src='https://i.ibb.co/Pcg0Pk1/logo.png' alt='logo' />
        </div>

        <div className='login'>
          <div className='container'>
            <h1>
              Signin to access to
              <br />
              your account
            </h1>

            <div className='login-form'>
              <form action='' onSubmit={(e) => submit(e)}>
                <input
                  type='email'
                  id='email'
                  placeholder='E-mail Address'
                  ref={emailRef}
                  required
                />
                <input
                  type='password'
                  id='password'
                  placeholder='Password'
                  ref={passwordRef}
                  required
                />

                <div className='remember-form'>
                  <input type='checkbox' onChange={handlecheckbox} />
                  <span>Remember me</span>
                </div>
                <div className='forget-pass'>
                  <a href='#'>Forgot Password ?</a>
                </div>
              <div className='signup-ask'>
                {/* Already have an account? Sign in */}
                Don't have an account?
                <Link to='/signup' className="signup-ask-link">Sign up</Link>
              </div>
                <button type='submit'>Signin</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
