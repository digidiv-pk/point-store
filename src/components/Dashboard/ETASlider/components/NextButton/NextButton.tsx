import React, { MouseEvent } from 'react';

interface Props {
  onClick(e: MouseEvent<HTMLButtonElement>): void;
}

const NextButton = (props: Props): JSX.Element => {
  return (
    <button
      className="btn btn-circle slider-control-button-next"
      onClick={props.onClick}
      type="button">
      <span className="material-icons">arrow_forward_ios</span>
    </button>
  );
};

export default NextButton;
