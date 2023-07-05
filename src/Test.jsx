import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Test = ({ data, setTrigger, trigger }) => {
  const [isReply, setIsReply] = useState(false);
  const [Comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleReply = (id) => {};
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
        <div>2323234234234</div>
      </div>
      <div className='notification-body'>
        <div className='notification-video-section'>
          <div className='notification-video-info'>
            <p style={{ fontWeight: "bold" }}>Falafel</p>
            <p className="vid-topic">Books and Books</p>
          </div>
          <div>
            <video
              src={require("./assets/vid.mp4")}
              className='notification-video'
            />
          </div>
        </div>
        <div className='notification-info'>
          <div className='notification-info-profile'>
            <div>
              <p className='notification-name'>Majd Abed</p>
              <p className='notification-country'>Syrian Arab Republic</p>
            </div>
            <img
              src={require("./assets/images/propic.png")}
              className='notification-pic'></img>
          </div>
            <p className='question'>dsofid nsoginfso ignfo sdifndos dfnisdongo</p>
          <div className='notification-content'>
            <div className='notification-reply-container'>
              {1 === 0 ? (
                <>
                  <p className='notification-answer'>vdf dsvv dvdvdsfvsd fdsfsd</p>
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
                      onClick={() => setIsReply(false)}>
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

export default Test;
