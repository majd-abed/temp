import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { CATEGORIES, http, VIDEO_CREATE } from "../api";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Progressbar from "./Progressbar";
const VideoPost = () => {
  const inputRef = useRef(null);
  const categoryRef = useRef(null);

  const [count, setCount] = useState(0);
  const [filename, setFilename] = useState("");
  const [categories, setCategories] = useState([]);
  const [videoCategory, setVideoCategory] = useState(0);
  const [videoInput, setvideoInput] = useState(null);
  const [isVideoEmpty, setIsVideoEmpty] = useState(false);
  const [isKeywordsEmpty, setIsKeywordsEmpty] = useState(false);
  const [isCatEmpty, setIsCatEmpty] = useState(false);
  const [vidWidth, setVidWidth] = useState(0);
  const [vidHeight, setVidHeight] = useState(0);
  const onSelectHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    if (option === 9999) return setIsCatEmpty(true);
    setIsCatEmpty(false);
    setVideoCategory(option);
  };
  const handleInput = () => {
    if (inputRef.current.value) setIsKeywordsEmpty(false);
  };
  const publish = (evt) => {
    const formData = new FormData();
    if (!videoInput) setIsVideoEmpty(true);
    if (!videoCategory) setIsCatEmpty(true);
    if (!inputRef.current.value) setIsKeywordsEmpty(true);
    if (!videoInput || !inputRef.current.value || !videoCategory) return null;
    const videoFile = videoInput[0];

    setIsVideoEmpty(false);
    setIsKeywordsEmpty(false);

    formData.append("video", videoFile);
    formData.append("is_live", 1);
    formData.append("category_id", videoCategory);
    formData.append("keywords", inputRef.current.value);
    if (vidHeight > 1920 || vidWidth > 1080)
      return toast.error("Video Resolution is bigger than 1920×1080.");
    if (videoFile.size > 20000000) return toast.error("Video Size is too big.");
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .post(VIDEO_CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
        onUploadProgress: (data) => {
          setCount(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.error(res.data.video);
        }
        if (res.status === 201) {
          toast.success(res.data.Message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };
  const save = () => {
    const formData = new FormData();
    if (!videoInput) setIsVideoEmpty(true);
    if (!videoCategory) setIsCatEmpty(true);
    if (!inputRef.current.value) setIsKeywordsEmpty(true);
    if (!videoInput || !inputRef.current.value || !videoCategory) return null;
    const videoFile = videoInput[0];
    setIsVideoEmpty(false);
    setIsKeywordsEmpty(false);
    formData.append("video", videoFile);
    formData.append("is_live", 0);
    formData.append("category_id", videoCategory);
    formData.append("keywords", inputRef.current.value);
    if (vidHeight > 1920 || vidWidth > 1080)
      return toast.error("Video Resolution is bigger than 1920×1080.");
    if (videoFile.size > 20000000) return toast.error("Video Size is too big.");
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .post(VIDEO_CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
        onUploadProgress: (data) => {
          setCount(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.error(res.data.video);
        }
        if (res.status === 201) {
          toast.success(res.data.Message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(CATEGORIES, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.categories;
        setCategories(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const uploadHandler = (e) => {
    setIsVideoEmpty(false);
    setvideoInput(e.target.files);
    //--------------------------------
    const url = URL.createObjectURL(e.target.files[0]);
    const video = document.createElement("video");
    video.onloadedmetadata = (evt) => {
      // Revoke when you don't need the url any more to release any reference
      setVidWidth(video.videoWidth);
      setVidHeight(video.videoHeight);
      URL.revokeObjectURL(url);
    };
    video.src = url;
    video.load(); // fetches metadata
    //--------------------------------------------

    if (e.target.files.length > 0) {
      let fname = e.target.files[0].name;
      setFilename(fname);
    }
  };

  useEffect(() => {}, [categories]);

  if (!localStorage.getItem("token") && !sessionStorage.getItem("token"))
    return <Navigate to='/' replace={true} />;
  return (
    <div>
      <header>
        <Navbar />
        {/* <div className='menu-slider'>
          <Menus />
        </div> */}
      </header>
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
      <div className='angel-container-alt'>
        <div className='video-post-container'>
          <button className='btn-file'>
            <span className='material-symbols-outlined'>video_call</span>
            <div>upload video</div>
            <input
              type='file'
              accept='video/*'
              onChange={uploadHandler}
              id='file'
              required
            />
          </button>
          <div>{filename}</div>
          <div className='require'>
            {isVideoEmpty ? "Select a video to upload" : ""}
          </div>

          <select
            className='select-option'
            onChange={onSelectHandler}
            required
            ref={categoryRef}>
            <option id={9999} key={9999} hidden>
              Choose Category
            </option>
            {categories.map((c) => {
              return (
                <option key={c.id} id={c.id}>
                  {c.category_name}
                </option>
              );
            })}
          </select>
          {isCatEmpty ? (
            <div className='require'>
              <br />
              Please Choose Category
            </div>
          ) : null}

          <input
            ref={inputRef}
            onChange={handleInput}
            type='text'
            className='keywords-input'
            placeholder='Video Topic'
            maxLength='50'
            required
          />
          {isKeywordsEmpty ? (
            <div className='require'>
              <br />
              Please provide Keywords
            </div>
          ) : null}

          <br />
          <p className='keyword-text'>
            Your video topic will be search keyword. So write appropriate topic
          </p>
          <p class='keyword-text'>
            <span
              style={{
                color: "red",
              }}>
              *
            </span>
            The video Size sould be less than 20MB and it's resolution should be less
            than 1920×1080
          </p>
          <br />
          <br />
          <div style={{ display: `${!count ? "none" : "block"}` }}>
            <div>
              <Progressbar progress={count} />
            </div>
            <div>{`${count}%`}</div>
          </div>
          <br />
          <div style={{ display: `${count ? "none" : "block"}` }}>
            <Link to='/' type='submit' className='secondary-btn'>
              Cancel
            </Link>
            <button onClick={() => save()} type='submit' className='secondary-btn'>
              Save and publish later
            </button>
            <button onClick={() => publish()} type='submit' className='primary-btn'>
              Publish now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoPost;
