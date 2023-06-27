import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COUNTRIES, http, SIGNUP } from "../api";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";
import Spinner from "./Spinner";
const Signup = () => {
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const businessRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const [emailWarning, setEmailWarning] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isPassIndetical, setIsPassIndetical] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

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

  const onSelectHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setCountryId(option);
  };

  async function handleSignup() {
    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      setIsPassIndetical(false);
    if (!validateEmail(emailRef.current.value)) setEmailWarning(true);
    if (!validatePassword(passwordRef.current.value)) setIsPasswordInvalid(true);
    if (
      !validateEmail(emailRef.current.value) ||
      !validatePassword(passwordRef.current.value) ||
      passwordRef.current.value !== confirmPasswordRef.current.value
    )
      return null;
    console.log(passwordRef.current.value, confirmPasswordRef.current.value);
    setStep(2);
    await http.get("/sanctum/csrf-cookie");
    await http
      .post(SIGNUP, {
        first_name: fNameRef.current.value,
        last_name: lNameRef.current.value,
        biz_name: businessRef.current.value,
        email: emailRef.current.value,
        country: countryId,
        password: passwordRef.current.value,
        password_confirmation: confirmPasswordRef.current.value,
      })
      .then((res) => {
        if (res.status === 201) {
          // window.location = "/signin";
          console.log(res);
        }
        if (res.status === 200) {
          console.log(res);
          // toast.error(res.data.email);
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
              <img
                src={require("../assets/images/wow_logo.png")}
                alt='logo'
                width='100px'
              />
            </div>
            {step === 1 ? (
              <div>
                {/* --------------- name ---------------*/}
                <div className='two-cols-container'>
                  <div class='input-group two-cols-group'>
                    <input
                      type='text'
                      className='input two-cols'
                      ref={fNameRef}
                      maxLength={25}
                      required
                      id='firstname-signup'
                    />
                    <label for='firstname-signup' className='input-label'>
                      First Name
                    </label>
                  </div>
                  <div class='input-group two-cols-group'>
                    <input
                      type='text'
                      className='input two-cols'
                      ref={lNameRef}
                      maxLength={25}
                      required
                      id='lastname-signup'
                    />
                    <label for='lastname-signup' className='input-label'>
                      Last Name
                    </label>
                  </div>
                </div>
                {/* ------------ Bussiness --------- */}
                <div class='input-group'>
                  <input
                    type='text'
                    className='input'
                    ref={businessRef}
                    maxLength={120}
                    required
                    id='business'
                  />
                  <label for='business' className='input-label'>
                    Business Name
                  </label>
                </div>
                {/* ------------ email ----------- */}
                <div class='input-group'>
                  <input
                    type='text'
                    className='input'
                    ref={emailRef}
                    onChange={() => {
                      setEmailWarning(false);
                    }}
                    required
                    id='email-signin'
                  />
                  <label for='email-signin' className='input-label'>
                    E-mail Address
                  </label>
                  {emailWarning ? (
                    <div
                      className='require-sign'
                      style={{ textAlign: "center", paddingBottom: "15px" }}>
                      Email is not valid{" "}
                    </div>
                  ) : null}
                </div>
                {/* ------------- passwords ----------- */}
                <div className='two-cols-container'>
                  <div class='input-group two-cols-group'>
                    <input
                      type='password'
                      className='input two-cols'
                      ref={passwordRef}
                      onChange={() => {
                        setIsPasswordInvalid(false);
                        setIsPassIndetical(true);
                      }}
                      required
                      id='password-signin'
                    />
                    <label
                      for='password-signin'
                      className='input-label password-mobile'>
                      Password
                    </label>
                  </div>
                  <div class='input-group two-cols-group'>
                    <input
                      type='password'
                      className='input two-cols'
                      ref={confirmPasswordRef}
                      onChange={() => {
                        setIsPasswordInvalid(false);
                        setIsPassIndetical(true);
                      }}
                      required
                      id='confirmpassword'
                    />
                    <label
                      for='confirmpassword'
                      className='input-label password-mobile'>
                      Confirm Password
                    </label>
                  </div>
                </div>
                {isPasswordInvalid ? (
                  <div
                    className='require-sign'
                    style={{
                      textAlign: "start",
                      width: "fit-content",
                      margin: "auto",
                    }}>
                    The password must contain:
                    <p>- Minimum 8 characters</p>
                    <p>- A mix of uppercase and lowercase letters</p>
                    <p>- Symbols (special characters) </p>- At least one number
                  </div>
                ) : null}
                {!isPasswordInvalid && !isPassIndetical ? <div>hi</div> : null}
                {/* ----------- country ------------ */}
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
                <div className='agree-text'>
                  <p>
                    By Signing Up, you agree to our{" "}
                    <Link to='/terms' className='agree-link'>
                      Terms
                    </Link>
                    ,{" "}
                    <Link to='/privacy' className='agree-link'>
                      Privacy Policy{" "}
                    </Link>
                    and{" "}
                    <Link to='#' className='agree-link'>
                      Cookies Policy
                    </Link>
                    .
                  </p>
                  <p>
                    You may recieve email notifications from us and can opt out at
                    anytime.
                  </p>
                </div>
                <div>
                  <button
                    className='sign-btn'
                    // onClick={() => handleSignup()}
                    style={{ backgroundColor: "black", color: "white" }}>
                    Create an account
                  </button>
                </div>
                <div className='signup-ask'>
                  Already have an account?
                  <Link to='/signin' className='signup-ask-link'>
                    Sign In
                  </Link>
                </div>
              </div>
            ) : null}
            {step === 2 ? (
              <div className='otp-container'>
                <p className='otp-text-info'>
                  An email has been sent to your email address containing OTP. If you
                  do not receive the email within a few minutes, please check your
                  spam folder.
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
                  className='opt-signup-btn'
                  disabled={otp.length < 4}
                  onClick={() => {
                    // handleOtp();
                    setStep(1);
                  }}>
                  Verify
                </button>
              </div>
            ) : null}
          </form>
        )}
      </div>
    </>
  );
};

export default Signup;
