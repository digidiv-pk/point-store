import clsx from 'clsx';
import React from 'react';
import classes from './PersonalInformation.module.scss';

function PersonalInformation(): JSX.Element {
  return (
    <section className={clsx('row no-gutters', classes.section)}>
      <h4>Personal Information:</h4>
      <div className="col-12 px-2">
        <div className="form-group">
          <label htmlFor="e-name" className="pl-4">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control bordered"
            id="e-name"
            placeholder="Ben Ganon"
          />
        </div>
      </div>
      <div className="col-12 px-2">
        <div className="form-group">
          <label htmlFor="phone-number" className="pl-4">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control bordered"
            id="phone-number"
            placeholder="+9721234567"
          />
        </div>
      </div>
      <div className="col-12 px-2">
        <div className="form-group">
          <label htmlFor="mobile-number" className="pl-4">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control bordered"
            id="mobile-number"
            placeholder="+9721234567"
          />
        </div>
      </div>
      <div className="col-12 px-2">
        <div className="form-group">
          <label htmlFor="e-mail" className="pl-4">
            E-mail
          </label>
          <input
            type="email"
            className="form-control bordered"
            id="e-mail"
            placeholder="ben@hakshatot.co.il"
          />
        </div>
      </div>
      <div className="col-12 px-2">
        <span
          style={{
            fontSize: '14px',
            paddingLeft: '10px',
            fontFamily: 'Rubik sans-serif',
          }}>
          Notification Type
        </span>
        <div className="form-check-group">
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="notification"
                value="option1"
                checked={true}
              />
              <span className="material-icons checked">radio_button_checked</span>
              <span className="material-icons unchecked">radio_button_unchecked</span>
              <span>SMS</span>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="notification"
                value="option1"
                checked={true}
              />
              <span className="material-icons checked">radio_button_checked</span>
              <span className="material-icons unchecked">radio_button_unchecked</span>
              <span>Email</span>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="notification"
                value="option1"
                checked={true}
              />
              <span className="material-icons checked">radio_button_checked</span>
              <span className="material-icons unchecked">radio_button_unchecked</span>
              <span>Phone</span>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="notification"
                value="option1"
                checked={true}
              />
              <span className="material-icons checked">radio_button_checked</span>
              <span className="material-icons unchecked">radio_button_unchecked</span>
              <span>None</span>
            </label>
          </div>
        </div>
      </div>
      <div className="col-12 px-2">
        <button type="submit" className="btn save-btn">
          Save Changes
        </button>
      </div>
    </section>
  );
}

export default PersonalInformation;
