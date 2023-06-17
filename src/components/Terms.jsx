import React from "react";
import { Link } from "react-router-dom";
const Terms = () => {
  return (
    <div className='terms-body'>
      <div className='container'>
        <div className='wow-logo'>
          <Link to='/'>
            <img
              className='img-responsive terms-img-logo'
              src={require("../assets/images/wow_logo.png")}
            />
          </Link>
        </div>
        <section className='generic text-center'>
          <h2 className='terms-header'>Terms and Conditions</h2>
          <hr className='hr-mid' />
          <img
            className='img-generic img-responsive'
            style={{ borderRadius: "2rem" }}
            src={require("../assets/images/terms.jpeg")}
          />
        </section>
        <section className='font-2'>
          <p className='generic-p'>
            Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis.
            Praesent rutrum sem diam, vitae egestas enim auctor sit amet.
            Pellentesque leo mauris, consectetur id ipsum sit amet, fergiat.
            Pellentesque in mi eu massa lacinia malesuada et a elit. Donec urna ex,
            lacinia in purus ac, pretium pulvinar mauris. Curabitur sapien risus,
            commodo eget turpis at, elementum convallis elit. Pellentesque enim
            turpis, hendrerit tristique.
          </p>
          <p className='generic-p'>
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Pellentesque venenatis dolor imperdiet dolor mattis sagittis. Praesent
            rutrum sem diam, vitae egestas enim auctor sit amet. Pellentesque leo
            mauris, consectetur id ipsum sit amet, fersapien risus, commodo eget
            turpis at, elementum convallis elit. Pellentesque enim turpis, hendrerit
            tristique lorem ipsum dolor.
          </p>
          <p className='generic-p'>
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Pellentesque venenatis dolor imperdiet dolor mattis sagittis. Praesent
            rutrum sem diam, vitae egestas enim auctor sit amet. Pellentesque leo
            mauris, consectetur id ipsum sit amet, fergiat. Pellentesque in mi eu
            massa lacinia malesuada et a elit. Donec urna ex, lacinia in purus ac,
            pretium pulvinar mauris. Curabitur sapien risus, commodo eget turpis at,
            elementum convallis elit. Pellentesque enim turpis, hendrerit tristique.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Pellentesque venenatis dolor imperdiet dolor mattis sagittis. Praesent
            rutrum sem diam, vitae egestas enim auctor sit amet. Pellentesque leo
            mauris, consectetur id ipsum sit amet, fersapien risus, commodo eget
            turpis.
          </p>
        </section>
      </div>

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

export default Terms;
