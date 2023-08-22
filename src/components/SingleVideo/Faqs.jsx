import React from "react";

const Faqs = ({ setToggleFaqs }) => {
  return (
    <div className='faq-container'>
      <button className='faq-arrow' onClick={() => setToggleFaqs(false)}>
        <img src={require("../../assets/images/faq-arrow.png")} alt='' />
      </button>
      <div className='faq-info'>
        <div className='faq-ask'>
          <div className='d-flex'>
            <div className='faq-image'>
              <img src='' alt='' />
            </div>
            <div>
              <h4 className='faq-name'>Popular belief, Lorem is simply text.</h4>
              <p className='faq-business'>Gluetron eBusiness, India.</p>
            </div>
          </div>
          <textarea
            type='text'
            className='faq-question-input'
            rows={2}
            placeholder='You may ask question here.'
          />
          <button className='faq-question-submit'>SUBMIT</button>
          <div className='faq-question-asked'>
            <div className='d-flex'>
              <div className='faq-image'>
                <img src='' alt='' />
              </div>
              <div>
                <h4 className='faq-name'>Popular belief, Lorem is simply text.</h4>
                <p className='faq-business'>Gluetron eBusiness, India.</p>
              </div>
            </div>
            <p className='faq-date'>1 July 2023</p>
            <p className='faq-question'>
              <span>Q:</span> Popular belief, Lorem is simply text.
            </p>
          </div>
          <div className='faq-question-answered'>
            <div className='d-flex'>
              <div className='faq-image'>
                <img src='' alt='' />
              </div>
              <div>
                <h4 className='faq-name'>Popular belief, Lorem is simply text.</h4>
                <p className='faq-business'>Gluetron eBusiness, India.</p>
              </div>
            </div>
            <p className='faq-date'>1 July 2023</p>
            <p className='faq-question'>
              <span>A:</span> Popular belief, Lorem is simply text.
            </p>
          </div>
          <div className='faq-question-asked'>
            <div className='d-flex'>
              <div className='faq-image'>
                <img src='' alt='' />
              </div>
              <div>
                <h4 className='faq-name'>Popular belief, Lorem is simply text.</h4>
                <p className='faq-business'>Gluetron eBusiness, India.</p>
              </div>
            </div>
            <p className='faq-date'>1 July 2023</p>
            <p className='faq-question'>
              <span>Q:</span> Popular belief, Lorem is simply text.
            </p>
          </div>
          <div className='faq-question-answered'>
            <div className='d-flex'>
              <div className='faq-image'>
                <img src='' alt='' />
              </div>
              <div>
                <h4 className='faq-name'>Popular belief, Lorem is simply text.</h4>
                <p className='faq-business'>Gluetron eBusiness, India.</p>
              </div>
            </div>
            <p className='faq-date'>1 July 2023</p>
            <p className='faq-question'>
              <span>A:</span> Popular belief, Lorem is simply text.
            </p>
          </div>
          <div className='faq-question-asked'>
            <div className='d-flex'>
              <div className='faq-image'>
                <img src='' alt='' />
              </div>
              <div>
                <h4 className='faq-name'>Popular belief, Lorem is simply text.</h4>
                <p className='faq-business'>Gluetron eBusiness, India.</p>
              </div>
            </div>
            <p className='faq-date'>1 July 2023</p>
            <p className='faq-question'>
              <span>Q:</span> Popular belief, Lorem is simply text.
            </p>
          </div>
          <div className='faq-question-answered'>
            <div className='d-flex'>
              <div className='faq-image'>
                <img src='' alt='' />
              </div>
              <div>
                <h4 className='faq-name'>Popular belief, Lorem is simply text.</h4>
                <p className='faq-business'>Gluetron eBusiness, India.</p>
              </div>
            </div>
            <p className='faq-date'>1 July 2023</p>
            <p className='faq-question'>
              <span>A:</span> Popular belief, Lorem is simply text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
