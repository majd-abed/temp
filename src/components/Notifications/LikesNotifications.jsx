import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../Footer";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import { http } from "../../api";

const LikesNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsData, setnotificationsData] = useState([]);
  const handleChange = (e) => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    if (e.target.value === "newest") {
      setIsLoading(true);
      http
        .get("/api/notifications/likes/newest-to-oldest", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((res) => {
          const data = res.data.notifications;

          setnotificationsData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (e.target.value === "oldest") {
      setIsLoading(true);
      http
        .get("/api/notifications/likes/oldest-to-newest", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((res) => {
          const data = res.data.notifications;

          setnotificationsData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get("/api/notifications/likes", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.notifications;

        setnotificationsData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {}, [notificationsData]);

  if (!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    return <Navigate to='/' replace={true} />;
  }
  return (
    <div>
      <div className='angel-container-list-no-menus'>
        <div className='top-sub-menu'>
          <div className='angel-top-sub-nav-divider-left'>
            <Link
              to='/likes-notifications'
              className='primary-btn'
              value=''
              style={{ marginRight: "5px" }}>
              Likes
            </Link>
            <Link
              to='/faqs-notifications'
              className='secondary-btn'
              value=''
              style={{ marginRight: "5px" }}>
              FAQS
            </Link>
          </div>
          <div className='angel-top-sub-nav-divider-right'>
            {notificationsData ? (
              <select className='select-filter-option' onChange={handleChange}>
                <option id={9999} key={9999} hidden>
                  Filter
                </option>
                <option value='newest'>Newest to Oldest</option>
                <option value='oldest'>Oldest to Newest</option>
              </select>
            ) : null}
          </div>
        </div>
      </div>
      {/* Notifications */}
      <div className='angel-container'>
        {isLoading ? (
          <div className='videos-spinner'>
            <Spinner />
          </div>
        ) : (
          <>
            {notificationsData ? (
              notificationsData.map((e) => {
                return (
                  <div className='notification-container' key={e.id}>
                    <div className='notification-header'>
                      <div>Like</div>
                      <div>{e.created_at}</div>
                    </div>
                    <div className='notification-body'>
                      <div className='notification-video-section'>
                        <div className='notification-video-info'>
                          <p style={{ fontWeight: "bold" }}>{e.category_name}</p>
                          <p className='vid-topic'>{e.keywords}</p>
                        </div>
                        <div className='notification-video-container'>
                          <video src={e.video} className='notification-video' />
                        </div>
                      </div>
                      <div className='notification-info'>
                        <div className='notification-info-profile'>
                          <div>
                            <p className='notification-name'>{e.name}</p>
                            <p className='notification-country'>{e.country_name}</p>
                          </div>
                          <img
                            src={
                              e.profile_pic === null
                                ? require("../../assets/images/propic.png")
                                : e.profile_pic
                            }
                            className='notification-pic'></img>
                        </div>
                        <div className='notification-content'>
                          <p style={{ fontStyle: "italic", padding: "20px" }}>
                            you got a Like!
                          </p>
                          <span
                            className='material-symbols-rounded'
                            style={{ fontSize: "50px", color: "#f04c68" }}>
                            favorite
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='no-content-notifications'>
                <span
                  className='material-symbols-outlined'
                  style={{ fontSize: "100px", color: "#aaaaaa" }}>
                  notifications
                </span>
                <h4>Your notifications live here</h4>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LikesNotifications;
