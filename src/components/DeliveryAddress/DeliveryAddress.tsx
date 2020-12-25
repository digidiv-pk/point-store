import React from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  show: boolean;
  onHide(): void;
}

function DeliveryAddress(props: Props): JSX.Element {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
      <div className="modal-body">
        <button
          aria-label="Close"
          className="close close-icon"
          data-dismiss="modal"
          type="button"
          onClick={() => props.onHide()}>
          <span className="material-icons">close</span>
        </button>
        <div className="dialog">
          <div className="dialog-title">Delivery Address</div>
          <div className="dialog-desc">Please enter the delivery address below</div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons">location_on</span>
              </span>
            </div>
            <input className="form-control" placeholder="Customer’s Address" type="text" />
          </div>
          <button className="btn dialog-button" type="button">
            Continue
          </button>
          <div className="dialog-bullets-row">
            <div className="dialog-bullets">
              <span className="material-icons">radio_button_unchecked</span>
              <span className="material-icons">stop_circle</span>
              <span className="material-icons">radio_button_unchecked</span>
              <span className="material-icons">radio_button_unchecked</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default DeliveryAddress;
