import clsx from 'clsx';
import { LanguageType } from 'context/LanguageContext/LanguageContext.interface';
import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { LanguageContext } from '../../context';

interface Props {
  text: Record<LanguageType, string>;
  cancelText: Record<LanguageType, string>;
  cancelBtnClassName: string;
  confirmText: Record<LanguageType, string>;
  confirmBtnClassName: string;
  onConfirm(): void;
  onHide(): void;
}

export function ConfirmDialogue(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  return (
    <Modal
      onHide={props.onHide}
      size="sm"
      show={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
      backdrop="static">
      <div className="modal-body">
        <div>{props.text[languageContext.state.lang]}</div>
      </div>
      <div className="modal-footer p-1">
        <button
          type="button"
          className={clsx('btn btn-sm', props.confirmBtnClassName)}
          onClick={props.onConfirm}>
          {props.confirmText[languageContext.state.lang]}
        </button>
        <button
          type="button"
          className={clsx('btn btn-sm', props.cancelBtnClassName)}
          data-dismiss="modal"
          onClick={props.onHide}>
          {props.cancelText[languageContext.state.lang]}
        </button>
      </div>
    </Modal>
  );
}
