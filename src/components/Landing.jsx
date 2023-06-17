import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <section className='head index-part-1'>
        <div className='wow'>
          <div className='container'>
            <div className='row'>
              <div className='wow-logo'>
                <img
                  className='img-responsive img-logo'
                  src={require("../assets/images/wow_logo.png")}
                />
              </div>
              <div className='font-1 helmet text-center'>
                <p className='heading-margin'>
                  A way of <strong>attract</strong> your consumers.
                </p>
              </div>
              <div className='wow-btn text-center'>
                <Link to='/signin' className='wow-button' href='#'>
                  Sign In
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
              <h2>Features</h2>
            </div>
            <hr className='hr-mid' />
            <div className='sub-text text-center'>
              <p className='font-1'>
                Reach your consumers by create and publish videos in OLY OLI.
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
                  Reach out your product or services from <strong>anywhere</strong>{" "}
                  to anywhere in the world.
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
                  Your customers can be <strong>anyone</strong> Either from local or
                  any place. Let them aware of you.
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
                  At <strong>anytime</strong> reach consumers. they may become your
                  customers at anytime.
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
                  Cup of coffee or Set of meals, Pin or Pen, Mobile or Mobots. You
                  can promote <strong>Anything</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='index-part-3'>
        <div className='container'>
          <div className='row why-div'>
            <div className='text-center'>
              <h2>About OLY OLI</h2>
            </div>
            <hr className='hr-mid' />
            <div className='sub-text text-center'>
              <p className='font-1'>
                Its a digital platform to promote your products and services by
                creating short promo videos.
              </p>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-9 col-sm-12 col-md-9 col-xs-12'>
              <div className='holder-para'>
                <h3>Short videos</h3>
                <hr className='hr-short' />
                <p className='font-2'>
                  It is a long established fact that a reader will be distracted by
                  the readable content of a page when looking at its layout. The
                  point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content
                  here', making it look like readable English. Many desktop
                  publishing packages and web page editors now use Lorem Ipsum as
                  their default model text, and a search for 'lorem ipsum' will
                  uncover many web sites still in their infancy.
                </p>
              </div>
            </div>
            <div className='col-lg-3 col-xs-12 col-sm-12 col-md-3'>
              <div className='holder-img'>
                <img
                  className='round-img img-responsive center-block'
                  src={require("../assets/images/short.jpeg")}
                />
              </div>
            </div>
          </div>

          <hr className='line-full' />

          <div className='row'>
            <div className='col-lg-9 col-xs-12 col-sm-12 col-md-9 col-md-push-3'>
              <div className='holder-para'>
                <h3>Reach out</h3>
                <hr className='hr-short' />
                <p className='font-2'>
                  It is a long established fact that a reader will be distracted by
                  the readable content of a page when looking at its layout. The
                  point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content
                  here', making it look like readable English. Many desktop
                  publishing packages and web page editors now use Lorem Ipsum as
                  their default model text, and a search for 'lorem ipsum' will
                  uncover many web sites still in their infancy.
                </p>
              </div>
            </div>
            <div className='col-lg-3 col-xs-12 col-sm-12 col-md-3 col-md-pull-9'>
              <div className='holder-img'>
                <img
                  className='round-img img-responsive center-block'
                  src={require("../assets/images/network.jpeg")}
                />
              </div>
            </div>
          </div>

          <hr className='line-full' />

          <div className='row'>
            <div className='col-lg-9 col-xs-12 col-sm-12 col-md-9'>
              <div className='holder-para'>
                <h3>Get interact</h3>
                <hr className='hr-short' />
                <p className='font-2'>
                  It is a long established fact that a reader will be distracted by
                  the readable content of a page when looking at its layout. The
                  point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content
                  here', making it look like readable English. Many desktop
                  publishing packages and web page editors now use Lorem Ipsum as
                  their default model text, and a search for 'lorem ipsum' will
                  uncover many web sites still in their infancy.
                </p>
              </div>
            </div>
            <div className='col-lg-3 col-xs-12 col-sm-12 col-md-3'>
              <div className='holder-img'>
                <img
                  className='round-img img-responsive center-block'
                  src={require("../assets/images/social.jpeg")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='index-part-4'>
        <div className='container'>
          <div className='row'>
            <div className='text-center'>
              <h2>Step in OLY OLI</h2>
            </div>
            <hr className='hr-mid' />
            <div className='sub-text text-center'>
              <p className='font-1'>
                Sed varius suspendisse dictum leo ipsum amet pellentesque fusce ac
                hendrerit consectetur tempor lorem ipsum
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

      <section className='social'>
        <ul>
          <li>
            <a href='#' className='fa fa-facebook fa-2x' aria-hidden='true'></a>
          </li>
          <li>
            <a href='#' className='fa fa-twitter fa-2x' aria-hidden='true'></a>
          </li>
          <li>
            <a href='#' className='fa fa-linkedin fa-2x' aria-hidden='true'></a>
          </li>
          <li>
            <a href='#' className='fa fa-youtube fa-2x' aria-hidden='true'></a>
          </li>
        </ul>
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
                src={require("../assets/images/footer-logo.png")}
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

export default Landing;
