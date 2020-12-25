import React, { FormEvent, useState } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  show: boolean;
  error: string;
  onSubmit(value: string): void;
  onHide(): void;
}
function UnlockPage(props: Props): JSX.Element {
  const [state, setState] = useState<string>('');
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit(state);
  };
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Unlock Page</Modal.Title>
        </Modal.Header>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="passwordInput">Page Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              required={true}
              placeholder="Page Password"
              onChange={(event) => {
                setState(event.target.value);
              }}
            />
            {!!props.error && <small className="form-text text-danger">{props.error}</small>}
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Unlock
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UnlockPage;
