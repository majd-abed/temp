import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import { COUNTRIES, http, MY_PROFILE } from "../api";
import Spinner from "./Spinner";
import Footer from "./Footer";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const imageRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const locationRef = useRef(null);
  const passwordRef = useRef(null);
  const currPasswordRef = useRef(null);
  const emailPasswordRef = useRef(null);

  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowEmailPass, setIsShowEmailPass] = useState(false);
  const [isShowCurrPass, setIsShowCurrPass] = useState(false);
  const [isEmailPassowrdShort, setIsEmailPassowrdShort] = useState(false);
  const [isLocationEmpty, setIsLocationEmpty] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [countries, setCountries] = useState([]);
  const [locationId, setLocationId] = useState(1);
  const [locationSelect, setLocationSelect] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [isEmailSubmit, setIsEmailSubmit] = useState(false);
  const [isPasswordSubmit, setIsPasswordSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

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
    setLocationId(option);
    setLocationSelect(false);
  };

  async function handleChangeName(id) {
    await http.get("/sanctum/csrf-cookie");
    await axios
      .patch(
        `https://beta-api-test.s360.cloud/api/myprofile/username/update/${id}`,
        {
          name: usernameRef.current.value,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Username has changed Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const changeUsername = () => {
    if (!usernameRef.current.value) return setIsUsernameEmpty(true);
    setIsUsernameEmpty(false);
    handleChangeName(userInfo.user_id);
  };
  const changeEmail = async (id) => {
    if (!emailPasswordRef.current.value || emailPasswordRef.current.value.length < 8)
      setIsEmailPassowrdShort(true);
    if (!validateEmail(emailRef.current.value)) setEmailWarning(true);
    if (
      !emailPasswordRef.current.value ||
      emailPasswordRef.current.value.length < 8 ||
      !validateEmail(emailRef.current.value)
    )
      return null;
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http
      .patch(
        `/api/myprofile/email/update/${id}`,
        {
          new_email: emailRef.current.value,
          password: emailPasswordRef.current.value,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((res) => {
        if (res.data.message === "User email updated successfully") {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  async function handleChangeLocation(id) {
    await http.get("/sanctum/csrf-cookie");
    await axios
      .patch(`https://beta-api-test.s360.cloud/api/myprofile/country/update/${id}`, {
        country: locationId,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Location has changed Successfully");
          setTrigger(!trigger);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const changeLocation = () => {
    if (!locationRef.current.value) setIsLocationEmpty(true);
    setIsLocationEmpty(false);
    if (locationSelect) return;
    handleChangeLocation(userInfo.user_id);
  };
  const changePassword = async (id) => {
    if (!validatePassword(passwordRef.current.value))
      return setIsPasswordInvalid(true);
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http
      .patch(
        `/api/myprofile/password/update/${id}`,
        {
          new_password: passwordRef.current.value,
          old_password: currPasswordRef.current.value,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((res) => {
        if (res.data.message === "Your Password updated successfully") {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    axios.get(COUNTRIES).then((response) => {
      setCountries(response.data?.countries);
    });
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(MY_PROFILE, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.profile[0];
        setUserInfo(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("https://beta-api-test.s360.cloud/api/propic/view", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.profile_picture;
        setProfilePic(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [trigger]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const processCroppedImage = useCallback(async () => {
    try {
      const { file, url } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      var myBlob = file;
      myBlob.name = "image.jpeg";
      myBlob.lastModified = new Date();
      const myFile = new File([myBlob], "image.jpeg", {
        type: myBlob.type,
      });

      uploadImage(myFile);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(0);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        file.name = "cropped.jpeg";
        resolve({ file: file, url: URL.createObjectURL(file) });
      }, "image/jpeg");
    });
  }

  const selectImageHandler = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    const imageFile = file;
    formData.append("profile_pic", imageFile);

    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .post("https://beta-api-test.s360.cloud/api/propic/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((success) => {
        toast.success("Photo Uploaded Successfully!");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };
  if (!localStorage.getItem("token") && !sessionStorage.getItem("token"))
    return <Navigate to='/' replace={true} />;
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
      {isLoading ? (
        <div className='profile-spinner'>
          <Spinner />
        </div>
      ) : (
        <div className='angel-container-alt'>
          {imageSrc ? (
            <div className='cropper-container'>
              <div className='cropper'>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape='round'
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className='crop-btns'>
                <button
                  className='crop-cancel'
                  onClick={() => (window.location = "/profile")}>
                  Cancel
                </button>
                <button
                  className='crop-upload'
                  onClick={() => processCroppedImage()}>
                  Upload
                </button>
              </div>
            </div>
          ) : null}
          <div
            className='profile-container'
            style={{ filter: `${imageSrc ? "blur(5px)" : null}` }}>
            {/* -----------Image ----------------*/}
            <div id='ImagePreview' style={{ display: "block" }}>
              <div>
                <img
                  src={
                    profilePic === null
                      ? require("../assets/images/propic.png")
                      : profilePic
                  }
                  alt='prop'
                  className='profile-photo'
                />
              </div>
            </div>
            <div className='change-img-btn serif-font'>
              <input
                type='file'
                ref={imageRef}
                name='propic'
                id='input'
                accept='image/*'
                onChange={selectImageHandler}
              />
              Change Profile Photo
            </div>
            <div className='input-container'>
              <input
                ref={usernameRef}
                type='text'
                name='username'
                id='username'
                className='profile-input'
                placeholder={userInfo ? userInfo.name : "Username"}
              />
              {isUsernameEmpty ? (
                <p className='require-profile'>Username cannot be empty </p>
              ) : (
                <br />
              )}
              <button onClick={changeUsername} className='change-btn'>
                Change username
              </button>

              {/* -------------- change location ------------ */}

              <select
                onChange={onSelectHandler}
                className='profile-input country-input-extra-width'
                id='country'
                ref={locationRef}
                required>
                <option id={999} key={999} hidden>
                  {userInfo.country_name}
                </option>
                {countries.map((c) => {
                  return (
                    <option id={c.id} key={c.id}>
                      {c.country_name}
                    </option>
                  );
                })}
              </select>
              {isLocationEmpty ? (
                <div className='require-profile'>Location cannot be empty </div>
              ) : (
                <br />
              )}
              <button onClick={changeLocation} className='change-btn'>
                Change Location
              </button>

              {/* -------------- change email ------------ */}
              <br />
              <input
                value={userInfo ? userInfo.email : "Email"}
                disabled
                type='email'
                name='email'
                className='profile-input'
              />
              {isEmailSubmit ? (
                <div>
                  <button
                    onClick={() => window.location.reload()}
                    className='change-btn'>
                    Cancel
                  </button>
                  <div className='empty-holder'></div>
                  <input
                    ref={emailRef}
                    type='email'
                    name='email'
                    id='email'
                    placeholder='New Email'
                    className='profile-input'
                    onChange={() => {
                      setEmailWarning(false);
                    }}
                  />
                  {emailWarning ? (
                    <div className='require-profile'>Email is not valid </div>
                  ) : null}
                  <div style={{ position: "relative" }}>
                    <input
                      ref={emailPasswordRef}
                      type={isShowEmailPass ? "text" : "password"}
                      name='password'
                      id='password'
                      className='profile-input extra-margin'
                      placeholder='Current Password'
                      onChange={() => {
                        setIsEmailPassowrdShort(false);
                      }}
                    />
                    <span
                      className='password-show-profile'
                      onClick={() => setIsShowEmailPass(!isShowEmailPass)}>
                      {isShowEmailPass ? (
                        <span class='material-symbols-outlined'>visibility_off</span>
                      ) : (
                        <span class='material-symbols-outlined'>visibility</span>
                      )}
                    </span>
                  </div>
                  {isEmailPassowrdShort ? (
                    <div className='require-profile'>
                      Password must contain at least 8 characters{" "}
                    </div>
                  ) : null}
                  <div className='submit-btns'>
                    <button
                      onClick={() => changeEmail(userInfo.user_id)}
                      className='change-btn'>
                      Submit email change
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsEmailSubmit(true)}
                    className='change-btn'>
                    Change Email
                  </button>
                </>
              )}
              <br />
              {/* -------------- change password ------------ */}
              <input
                value={"••••••••••"}
                disabled
                type='email'
                name='email'
                className='profile-input'
              />
              {isPasswordSubmit ? (
                <div>
                  <button
                    onClick={() => window.location.reload()}
                    className='change-btn'>
                    Cancel
                  </button>
                  <div className='empty-holder'></div>
                  <div style={{ position: "relative" }}>
                    <input
                      ref={passwordRef}
                      type={isShowPass ? "text" : "password"}
                      name='password'
                      id='newPassword'
                      className='password-input'
                      placeholder='New Password'
                      onChange={() => {
                        setIsPasswordInvalid(false);
                      }}
                    />
                    <span
                      className='password-show-profile'
                      onClick={() => setIsShowPass(!isShowPass)}>
                      {isShowPass ? (
                        <span class='material-symbols-outlined'>visibility_off</span>
                      ) : (
                        <span class='material-symbols-outlined'>visibility</span>
                      )}
                    </span>
                  </div>
                  {isPasswordInvalid ? (
                    <div
                      className='require-sign'
                      style={{
                        textAlign: "start",
                        width: "fit-content",
                        paddingBottom: "0px",
                      }}>
                      <br />
                      The password must contain:
                      <p>- Minimum 8 characters</p>
                      <p>- A mix of uppercase and lowercase letters</p>
                      <p>- Symbols (special characters) </p>- At least one number
                    </div>
                  ) : null}
                  <div style={{ position: "relative" }}>
                    <input
                      ref={currPasswordRef}
                      type={isShowCurrPass ? "text" : "password"}
                      name='password'
                      id='currpassword'
                      className='password-input extra-margin'
                      placeholder='Current Password'
                      onChange={() => {}}
                    />
                    <span
                      className='password-show-profile'
                      onClick={() => setIsShowCurrPass(!isShowCurrPass)}>
                      {isShowCurrPass ? (
                        <span class='material-symbols-outlined'>visibility_off</span>
                      ) : (
                        <span class='material-symbols-outlined'>visibility</span>
                      )}
                    </span>
                  </div>
                  <div className='submit-btns'>
                    <button
                      onClick={() => {
                        changePassword(userInfo.user_id);
                      }}
                      className='change-btn'>
                      Submit password change
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsPasswordSubmit(true);
                    }}
                    className='change-btn'>
                    Change Password
                  </button>
                </>
              )}

              {/* <div className='password-container'>
                <input
                  ref={passwordRef}
                  type='password'
                  name='password'
                  id='newPassword'
                  className='password-input'
                  placeholder='New Password'
                  onChange={() => {
                    setIsPasswordInvalid(false);
                    // setIsCurrPasswordShort(false);
                    // setIsPasswordShort(false);
                  }}
                />
                {isPasswordInvalid ? (
                  <div
                    className='require-sign'
                    style={{
                      textAlign: "start",
                      width: "fit-content",
                      paddingBottom: "0px",
                    }}>
                    <br />
                    The password must contain:
                    <p>- Minimum 8 characters</p>
                    <p>- A mix of uppercase and lowercase letters</p>
                    <p>- Symbols (special characters) </p>- At least one number
                  </div>
                ) : null}
                {isPasswordSubmit ? (
                  <>
                    <button
                      onClick={() => window.location.reload()}
                      className='change-btn'>
                      Cancel
                    </button>
                    <input
                      ref={currPasswordRef}
                      type='password'
                      name='password'
                      id='currpassword'
                      className='password-input extra-margin'
                      placeholder='Current Password'
                      onChange={() => {
                        // setIsCurrPasswordShort(false);
                        // setIsPasswordShort(false);
                      }}
                    />
                  </>
                ) : null}
              </div> */}

              {/* {!isPasswordInvalid && !isPassIndetical ? (
                <div className='require-sign'>
                  Password confirmation doesn't match password
                </div>
              ) : null} */}
              {/* {isPasswordShort || isCurrPasswordShort ? (
                <div className='require-profile'>
                  both Fields must contain at least 8 characters
                </div>
              ) : null} */}
              {/* {isPasswordSubmit ? (
                <button
                  onClick={() => {
                    changePassword(userInfo.user_id);
                  }}
                  className='change-password-btn'>
                  Submit password Change
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsPasswordSubmit(true);
                  }}
                  className='change-password-btn'>
                  Change Password
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
