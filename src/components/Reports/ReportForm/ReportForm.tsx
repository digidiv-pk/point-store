import React from 'react';

function ReportForm(): JSX.Element {
  return (
    <>
      <div className="earnings">
        <p>Your earnings will be deposited in your bank account on the 9th day of each month </p>
      </div>
      <div className="search-row">
        <div className="input-fields">
          <div className="form-group date-input">
            <label>Date</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text dark">
                  <span className="material-icons">expand_more</span>
                </span>
              </div>
              <input type="text" className="form-control" id="date-input" />
              <div className="input-group-append">
                <span className="input-group-text">
                  <span className="material-icons">calendar_today</span>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group time-input">
            <label>Time</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="material-icons">access_time</span>
                </span>
              </div>
              <input type="text" className="form-control" id="time-input" />
            </div>
          </div>
          <div className="form-group order-number-input">
            <label>Order Number</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="material-icons">description</span>
                </span>
              </div>
              <input type="text" className="form-control" id="order-number-input" />
            </div>
          </div>
          <div className="form-group price-input">
            <label>Price Range</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text price-input-text">
                  <span className="material-icons">money</span> <span>From</span>
                </span>
              </div>
              <input type="text" className="form-control" id="price-range-input" />
            </div>
          </div>
          <div className="form-group price-input">
            <label />
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span>To</span>
                </span>
              </div>
              <input type="text" className="form-control" id="price-range-input-to" />
            </div>
          </div>
          <button type="button" className="btn dark">
            Sort
          </button>
          <button type="button" className="btn dark-brown ">
            Advance Search
          </button>
        </div>
      </div>
    </>
  );
}

export default ReportForm;
