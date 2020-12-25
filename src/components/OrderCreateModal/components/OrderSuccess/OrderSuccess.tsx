import React from 'react';

function OrderSuccess(): JSX.Element {
  return (
    <>
      <div className="dialog notification">
        <div className="dialog-title">Courier is on the way</div>
        <span className="material-icons">check_circle</span>
      </div>
    </>
  );
}

export default OrderSuccess;
