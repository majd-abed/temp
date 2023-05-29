import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COUNTRIES, http, SIGNUP } from "../api";
const Signup = () => {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const onSelectHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setCountryId(option);
  };

  async function handleSignup() {
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
    });
  }, []);
  return (
    <>
      <div className='parent clearfix'>
        <div className='bg-illustration'>
          <img src='https://i.ibb.co/Pcg0Pk1/logo.png' alt='logo' />
        </div>
        <div className='login'>
          <div className='container'>
            <h1>Create an account</h1>
            <div className='login-form'>
              <form action='' onSubmit={(e) => submit(e)}>
                <input
                  type='text'
                  id='name'
                  placeholder='Username'
                  ref={nameRef}
                  required
                />
                <select
                  onChange={onSelectHandler}
                  className='countries-input'
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
                <div className='signup-ask'>
                  {/* Already have an account? Sign in */}
                  Already have an account?
                  <Link to='/signin' className='signup-ask-link'>
                    Sign in
                  </Link>
                </div>
                <button type='submit'>Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
