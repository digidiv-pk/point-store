import React from 'react';
import images from '../../../../assets/img';

function OperatingHours(): JSX.Element {
  return (
    <>
      <div className="card mt-3 card-borders">
        <div className="card-header">
          <div className="row no-gutters">
            <div className="col-6 left-inner-header">
              <p>Operating Hours</p>
            </div>
            <div className="col-6 righ-inner-header">
              <img src={images.DarkEdit} className="float-right" />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-6 no-gutters card-borders left-card-content">
              <p>IP Address Settings</p>
            </div>
            <div className="col-6 no-gutters card-borders right-card-content">
              <p>Available for everyoneI</p>
            </div>
            <div className="col-6 no-gutters card-borders left-card-content">
              <p>IP Address Settings</p>
            </div>
            <div className="col-6 no-gutters card-borders right-card-content">
              <p>Available for everyoneI</p>
            </div>

            <div className="col-6 no-gutters card-borders left-card-content">
              <p>IP Address Settings</p>
            </div>
            <div className="col-6 no-gutters card-borders right-card-content">
              <p>Available for everyoneI</p>
            </div>

            <div className="col-6 no-gutters card-borders left-card-content">
              <p>IP Address Settings</p>
            </div>
            <div className="col-6 no-gutters card-borders right-card-content">
              <p>Available for everyoneI</p>
            </div>
            <div className="col-6 no-gutters card-borders left-card-content">
              <p>IP Address Settings</p>
            </div>
            <div className="col-6 no-gutters card-borders right-card-content">
              <p>Available for everyoneI</p>
            </div>
            <div className="col-6 no-gutters left-card-content">
              <p>IP Address Settings</p>
            </div>
            <div className="col-6 no-gutters right-card-content">
              <p>Available for everyoneI</p>
            </div>
          </div>
        </div>
      </div>

      <button className="car-update-btn">Update Business Information</button>
    </>
  );
}

export default OperatingHours;
