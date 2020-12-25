import React from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  show: boolean;
  onHide(): void;
}
function CourierNotification(props: Props): JSX.Element {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
      <div className="modal-body notification">
        <button
          aria-label="Close"
          className="close close-icon"
          data-dismiss="modal"
          type="button"
          onClick={() => props.onHide()}>
          <span className="material-icons">close</span>
        </button>
        <div className="dialog notification">
          <div className="dialog-title">Delivery Address</div>
          <span className="material-icons">check_circle</span>
        </div>
      </div>
    </Modal>
  );
}
export default CourierNotification;
