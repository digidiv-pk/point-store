import React from 'react';
import images from '../../../assets/img';

function WalletGallary(): JSX.Element {
  return (
    <div className="wallet-gallary">
      <div className="earnings">
        <p>Your earnings will be deposited in your bank account on the 9th day of each month </p>
      </div>
      <div className="row no-gutters wallet-divs">
        <div className="col-3 g1 gallary-content">
          <div className="edit-icon">
            <img src={images.EditGIcon} alt="" />
          </div>
          <div className="gallary-inner-content">
            <h2>₪6650</h2>
            <img src={images.WalletWaves} alt="" />
            <p>Total Earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletGallary;
