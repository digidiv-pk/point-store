import React from 'react';

function HelpAndSupportform(): JSX.Element {
  return (
    <div className="search-row">
      <div className="input-fields">
        <div className="form-group date-input">
          <label />
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="date-input" placeholder="Today" />
            <div className="input-group-append">
              <span className="input-group-text dark">
                <span className="material-icons">expand_more</span>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group time-input">
          <label>From</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="time-input" placeholder="13/02/2020" />
            <div className="input-group-append">
              <span className="input-group-text">
                <span className="material-icons">date_range</span>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group order-number-input">
          <label>To</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="order-number-input"
              placeholder="13/06/2020"
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <span className="material-icons">date_range</span>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group price-input">
          <label>From</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text price-input-text">
                <span className="material-icons" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="price-range-input"
              placeholder="13/02/2020"
            />
          </div>
        </div>
        <div className="form-group price-input">
          <label>To</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="price-range-input-to"
              placeholder="13/02/2020"
            />
          </div>
        </div>
        <button type="button" className="btn dark">
          Search
        </button>
        <button type="button" className="btn dark advance">
          Advance Search
        </button>
      </div>
    </div>
  );
}
export default HelpAndSupportform;
