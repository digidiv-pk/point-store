import React from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  show: boolean;

  onHide(): void;
}

function CustomerInformation(props: Props): JSX.Element {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
      <div className="modal-body">
        <button className="close close-icon" type="button" onClick={() => props.onHide()}>
          <span className="material-icons">close</span>
        </button>
        <div className="dialog">
          <div className="dialog-title">Customer’s Information</div>
          <div className="dialog-desc">
            Please enter customer’s contact information for order updates
          </div>
          <div className="row">
            <div className="col-6 pr-1">
              <input className="dialog-input" placeholder="Full Name" type="text" />
            </div>
            <div className="col-6 pl-1">
              <input className="dialog-input" placeholder="Mobile Phone Number" type="text" />
            </div>
          </div>
          <button className="btn dialog-button" type="button">
            Next
          </button>
          <div className="dialog-bullets-row">
            <div className="dialog-bullets">
              <span className="material-icons">stop_circle</span>
              <span className="material-icons">radio_button_unchecked</span>
              <span className="material-icons">radio_button_unchecked</span>
              <span className="material-icons">radio_button_unchecked</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CustomerInformation;
