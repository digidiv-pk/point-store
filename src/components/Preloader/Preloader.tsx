import React from 'react';
import './preloader.scss';

function Preloader(): JSX.Element {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-content">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Preloader;
