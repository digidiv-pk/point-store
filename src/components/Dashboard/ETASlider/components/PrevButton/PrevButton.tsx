import React, { MouseEvent } from 'react';

interface Props {
  onClick(e: MouseEvent<HTMLButtonElement>): void;
}

const PrevButton = (props: Props): JSX.Element => {
  return (
    <button
      className="btn btn-circle slider-control-button-previous"
      onClick={props.onClick}
      type="button">
      <span className="material-icons">arrow_back_ios</span>
    </button>
  );
};

export default PrevButton;
