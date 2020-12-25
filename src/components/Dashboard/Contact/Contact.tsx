import React from 'react';

function Contact(): JSX.Element {
  return (
    <div className=" pr-0 pl-0 call ">
      <div className="contact-sect">
        <div className="question-links">
          <a href="" className="not-arround">
            What if you’re not around?
          </a>
          <a href="" className="notify">
            How should we notify you?
          </a>
          <div className="call-buttons">
            <button>Receive a phone call</button>
            <button>Receive an SMS</button>
            <button>Receive an E-mail notification</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
