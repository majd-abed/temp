import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Faq = ({ data, setTrigger, trigger }) => {
  const [isReply, setIsReply] = useState(false);
  const [Comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleReply = (id) => {
    if (!Comment) return toast.error("Comment reply ؤannot be empty");
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    axios
      .post(
        `https://beta-api-test.s360.cloud/api/videos/answer/${id}`,
        { comment_reply: Comment },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.error(res.data.message);
        }
        if (res.status === 201) {
          setTrigger(!trigger);
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='notification-container'>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
        gutter={8}
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
      <div className='notification-header'>
        <div>FAQ</div>
        <div>{data.Asked_on}</div>
      </div>
      <div className='notification-body'>
        <div className='notification-video-section'>
          <div className='notification-video-info'>
            <p style={{ fontWeight: "bold" }}>{data.category_name}</p>
            <p className='vid-topic'>{data.keywords}</p>
          </div>
          <div className='notification-video-container'>
            <video src={data.video} className='notification-video' />
          </div>
        </div>
        <div className='notification-info'>
          <div className='notification-info-profile'>
            <div>
              <p className='notification-name'>{data["Asked By"]}</p>
              <p className='notification-country'>{data.country_name}</p>
            </div>
            <img
              src={
                data.profile_pic === null
                  ? require("../../assets/images/propic.png")
                  : data.profile_pic
              }
              className='notification-pic'></img>
          </div>
          <p className='question'>{data.question}</p>
          <div className='notification-content'>
            <div className='notification-reply-container'>
              {data.answer ? (
                <>
                  <p className='notification-answer'>{data.answer}</p>
                  <div className='notification-replied-container'>
                    <button className='notification-replied' disabled>
                      Replied
                    </button>
                  </div>
                </>
              ) : isReply ? (
                <div className='notification-reply'>
                  <textarea
                    value={Comment}
                    maxLength={50}
                    onChange={handleCommentChange}
                    name=''
                    id=''
                    rows='1'
                    placeholder='Your Comment...'
                  />
                  <div className='notification-submit-reply-btn-container'>
                    <button
                      className='notification-submit-reply-btn'
                      onClick={() => handleReply(data.question_id)}>
                      Submit Reply
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className='notification-reply-btn'
                  onClick={() => setIsReply(true)}>
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
