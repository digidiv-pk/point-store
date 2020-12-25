import React, { createRef, FormEvent, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  show: boolean;
  error: string;
  title: string;
  inputTitle: string;
  children: React.ReactNode;

  onSubmit(value: string): void;

  onHide(): void;
}

function LockPage(props: Props): JSX.Element {
  const [state, setState] = useState<string>('');
  const ref = createRef<HTMLInputElement>();
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit(state);
  };
  useEffect(() => {
    if (props.show) {
      if (ref) {
        ref.current?.focus();
      }
    }
  }, [props.show]);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      {props.show && <>{props.children}</>}

      <form onSubmit={onSubmit} autoComplete="off">
        <Modal.Header closeButton={true}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="passwordInput">{props.inputTitle}</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              required={true}
              ref={ref}
              placeholder={props.inputTitle}
              onChange={(event) => {
                setState(event.target.value);
              }}
            />
            {!!props.error && <small className="form-text text-danger">{props.error}</small>}
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            {props.title}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default LockPage;
