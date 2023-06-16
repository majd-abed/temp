import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COUNTRIES, http, SIGNUP } from "../api";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "./Spinner";
const Signup = () => {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const [emailWarning, setEmailWarning] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const onSelectHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setCountryId(option);
  };

  async function handleSignup() {
    if (!validateEmail(emailRef.current.value)) setEmailWarning(true);
    if (!passwordRef.current.value.length < 8) setIsPasswordShort(true);
    if (
      !validateEmail(emailRef.current.value) ||
      !passwordRef.current.value.length < 8
    )
      return null;
    await http.get("/sanctum/csrf-cookie");
    await http
      .post(SIGNUP, {
        name: nameRef.current.value,
        email: emailRef.current.value,
        country: countryId,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status === 201) {
          window.location = "/signin";
        }
        if (res.status === 200) {
          toast.error(res.data.email);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const submit = (e) => {
    e.preventDefault();
    handleSignup();
  };
  useEffect(() => {
    axios.get(COUNTRIES).then((response) => {
      setCountries(response.data?.countries);
      setIsLoading(false);
    });
  }, []);
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
        {isLoading ? (
          <div className='sign-spinner'>
            <Spinner />
          </div>
        ) : (
          <form
            className='container'
            onSubmit={(e) => submit(e)}
            style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <div className='logo-container' style={{ marginBottom: "20px" }}>
              <img src={require("../assets/images/wow_logo.png")} alt='logo' />
            </div>
            <div>
              <input
                type='text'
                id='name'
                placeholder='Username'
                ref={nameRef}
                className='sign-input'
                required
              />
            </div>
            <div>
              <select
                onChange={onSelectHandler}
                className='sign-countries'
                id='country'
                required>
                {countries.map((c) => {
                  return (
                    <option id={c.id} key={c.id}>
                      {c.country_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-floating mb-3'>
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
                <div className='require-sign' style={{ paddingBottom: "10px" }}>
                  Email is not valid{" "}
                </div>
              ) : null}
              {/* <label for='floatingInput' className='text-secondary'>
              Email address
            </label> */}
            </div>
            <div className='form-floating'>
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
                <div className='require-sign'>
                  Password must contain at least 8 characters
                </div>
              ) : null}
              {/* <label for='floatingPassword' className='text-secondary'>
              Password
            </label> */}
            </div>
            <div>
              <button
                className='sign-btn'
                // onClick={() => handleSignup()}
                style={{ backgroundColor: "black", color: "white" }}>
                Sign up
              </button>
            </div>
            <div className='signup-ask'>
              Already have an account?
              <Link to='/signin' className='signup-ask-link'>
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Signup;
