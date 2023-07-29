import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LandingVideo from "./LandingVideo";
const Landing = () => {
  const [landingVideos, setLandingVideos] = useState([]);

  const previousLandingVideoRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://beta-api-live.s360.cloud/api/landingvideos")
      .then((response) => {
        console.log(response?.data.video);
        setLandingVideos(response?.data.video);
      });
  }, []);
  return (
    <div>
      <section class='head index-part-1'>
        <div class='wow'>
          <div class='container'>
            <div class='row'>
              <div class='wow-logo'>
                <img
                  class='img-responsive img-logo'
                  src={require("../assets/images/olyoli-logo.png")}
                />
              </div>
              <div class='helmet text-center'>
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
              <div class='wow-btn text-center'>
                <Link to='/signin' class='wow-button' href='#'>
                  Sign In
                </Link>
              </div>
              <div className='landing-videos-container'>
                {landingVideos
                  ? landingVideos.map((element) => {
                      if (element.is_live === 1) {
                        return (
                          <LandingVideo
                            data={element}
                            key={element.video_id}
                            previousLandingVideoRef={previousLandingVideoRef}
                          />
                        );
                      }
                    })
                  : null}
                {landingVideos
                  ? landingVideos.map((element) => {
                      if (element.is_live === 1) {
                        return (
                          <LandingVideo
                            data={element}
                            key={element.video_id}
                            previousLandingVideoRef={previousLandingVideoRef}
                          />
                        );
                      }
                    })
                  : null}
              </div>
              <div class='wow-btn text-center'>
                <Link to='/signin' class='wow-button' href='#'>
                  VIEW MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class='index-part-2'>
        <div class='container'>
          <div class='row'>
            <div class='text-center'>
              <h2>About OLYOLI</h2>
            </div>
            <hr class='hr-mid' />
            <div class='sub-text text-center'>
              <p class='font-1'>
                Reach your consumers by publishing marketing videos on OLYOLI.
              </p>
            </div>
          </div>

          <div class='row'>
            <div class='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div class='block text-center block-first'>
                <div class='icon'>
                  <i class='fa fa-globe fa-2x'></i>
                </div>
                <h4>Anywhere</h4>
                <p class='font-2'>
                  Reach out for your products or services from anywhere to anywhere
                  in the world.
                </p>
              </div>
            </div>
            <div class='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div class='block text-center block-second'>
                <div class='icon'>
                  <i class='fa fa-hand-paper-o fa-2x'></i>
                </div>
                <h4>Anyone</h4>
                <p class='font-2'>
                  Your customers can be anyone either from a local or any place. Let
                  them be aware of you.
                </p>
              </div>
            </div>
          </div>

          <div class='row'>
            <div class='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div class='block text-center block-third'>
                <div class='icon'>
                  <i class='fa fa-clock-o fa-2x'></i>
                </div>
                <h4>Anytime</h4>
                <p class='font-2'>
                  At anytime reach consumers. they may become your customers at
                  anytime.
                </p>
              </div>
            </div>
            <div class='col-xs-12 col-lg-6 col-sm-6 col-md-6 col-block padding-x-none'>
              <div class='block text-center block-last'>
                <div class='icon'>
                  <i class='fa fa-check-circle-o fa-2x'></i>
                </div>
                <h4>Anything</h4>
                <p class='font-2'>
                  Any kind of consumer product or service, You can promote anything
                  for free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class='index-part-4'>
        <div class='container'>
          <div class='row'>
            <div class='text-center'>
              <h2>Step in OLYOLI</h2>
            </div>
            <hr class='hr-mid' />
            <div class='sub-text text-center'>
              <p class='font-1'>Let's promote your products or services for free.</p>
            </div>
          </div>

          <div class='row text-center'>
            <Link to='/signup' class='wow-button' href='#'>
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
      <section class='footer'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-5 col-md-5 col-sm-5 col-xs-5'>
              <div class='footer-p1'>
                <p class='font-2'>Copy right 2023 by Oly Oli</p>
              </div>
            </div>
            <div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
              <img
                class='img-responsive foot-img'
                src={require("../assets/images/olyoli-icon.png")}
              />
            </div>
            <div class='col-lg-5 col-md-5 col-sm-5 col-xs-5'>
              <div class='footer-p2'>
                <p class='font-2'>
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

export default Landing;
