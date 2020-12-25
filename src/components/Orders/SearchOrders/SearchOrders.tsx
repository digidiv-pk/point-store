import React from 'react';

function SearchOrders(): JSX.Element {
  return (
    <div className="search-order">
      <p>Search Orders</p>
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
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchOrders;
