import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AboutVideo from "./AboutVideo";
const About = () => {
  const [AboutVideos, setAboutVideos] = useState([]);

  const previousAboutVideoRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://beta-api-live.s360.cloud/api/landingvideos")
      .then((response) => {
        setAboutVideos(response?.data.video);
      });
  }, []);
  return (
    <div>
      <section className='head index-part-1'>
        <div className='wow'>
          <div className='container'>
            <div className='row'>
              <div className='wow-logo'>
                <img
                  className='img-responsive img-logo'
                  src={require("../assets/images/olyoli-logo.png")}
                />
              </div>
              <div className='helmet text-center'>
                <div className='heading-margin'>
                  <h2>
                    Marketing Video <br /> Streaming Service Platform
                  </h2>
                  <br />
                  <h6>
                    Reach your consumers by publishing marketing videos on OLYOLI
                  </h6>
                </div>
              </div>
              <div className='wow-btn text-center'>
                <Link to='/signin' className='wow-button' href='#'>
                  Sign In
                </Link>
              </div>
              <div className='About-videos-container'>
                {AboutVideos
                  ? AboutVideos.map((element) => {
                      if (element.is_live === 1) {
                        return (
                          <AboutVideo
                            data={element}
                            key={element.video_id}
                            previousAboutVideoRef={previousAboutVideoRef}
                          />
                        );
                      }
                    })
                  : null}
              </div>
              <div className='wow-btn text-center'>
                <Link to='/signin' className='wow-button' href='#'>
                  VIEW MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='index-part-2'>
        <div className='container'>
          <div className='row'>
            <div className='text-center'>
              <h2>About OLYOLI</h2>
            </div>
            <hr className='hr-mid' />
            <div className='sub-text text-center'>
              <p className='font-1'>
                Reach your consumers by publishing marketing videos on OLYOLI.
              </p>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div className='block text-center block-first'>
                <div className='icon'>
                  <i className='fa fa-globe fa-2x'></i>
                </div>
                <h4>Anywhere</h4>
                <p className='font-2'>
                  Reach out for your products or services from anywhere to anywhere
                  in the world.
                </p>
              </div>
            </div>
            <div className='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div className='block text-center block-second'>
                <div className='icon'>
                  <i className='fa fa-hand-paper-o fa-2x'></i>
                </div>
                <h4>Anyone</h4>
                <p className='font-2'>
                  Your customers can be anyone either from a local or any place. Let
                  them be aware of you.
                </p>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div className='block text-center block-third'>
                <div className='icon'>
                  <i className='fa fa-clock-o fa-2x'></i>
                </div>
                <h4>Anytime</h4>
                <p className='font-2'>
                  At anytime reach consumers. they may become your customers at
                  anytime.
                </p>
              </div>
            </div>
            <div className='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div className='block text-center block-last'>
                <div className='icon'>
                  <i className='fa fa-check-circle-o fa-2x'></i>
                </div>
                <h4>Anything</h4>
                <p className='font-2'>
                  Any kind of consumer product or service, You can promote anything
                  for free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='index-part-4'>
        <div className='container'>
          <div className='row'>
            <div className='text-center'>
              <h2>Step in OLYOLI</h2>
            </div>
            <hr className='hr-mid' />
            <div className='sub-text text-center'>
              <p className='font-1'>
                Let's promote your products or services for free.
              </p>
            </div>
          </div>

          <div className='row text-center'>
            <Link to='/signup' className='wow-button' href='#'>
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
      <section className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5 col-md-5 col-sm-5 col-xs-5'>
              <div className='footer-p1'>
                <p className='font-2'>Copy right 2023 by Oly Oli</p>
              </div>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
              <img
                className='img-responsive foot-img'
                src={require("../assets/images/olyoli-icon.png")}
              />
            </div>
            <div className='col-lg-5 col-md-5 col-sm-5 col-xs-5'>
              <div className='footer-p2'>
                <p className='font-2'>
                  <Link to='/privacy'>Privacy</Link> &<Link to='/terms'>Terms</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
