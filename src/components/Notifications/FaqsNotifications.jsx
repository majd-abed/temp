import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../Footer";
import Spinner from "../Spinner";
import { http } from "../../api";
import Faq from "./Faq";

const FaqsNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsData, setnotificationsData] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const handleChange = (e) => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    if (e.target.value === "newest") {
      setIsLoading(true);
      http
        .get("/api/notifications/faq/newest-to-oldest", {
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
        .get("/api/notifications/faq/oldest-to-newest", {
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
      .get("/api/notifications/faq", {
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
  }, [trigger]);
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
              className='secondary-btn'
              value=''
              style={{ marginRight: "5px" }}>
              Likes
            </Link>
            <Link className='primary-btn'>FAQS</Link>
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
      {/* Notifiactions */}
      <div className='angel-container'>
        {isLoading ? (
          <div className='videos-spinner'>
            <Spinner />
          </div>
        ) : (
          <>
            {notificationsData ? (
              notificationsData.map((e, idx) => {
                return (
                  <Faq
                    data={e}
                    key={idx}
                    setTrigger={setTrigger}
                    trigger={trigger}
                  />
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

export default FaqsNotifications;
