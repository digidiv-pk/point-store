import React from 'react';
import images from '../../assets/img';

function WalletInfoDetails(): JSX.Element {
  return (
    <div className="row no-gutters blue-orange">
      <div className="col-6 blue">
        <div className="row no-gutters blue-inner">
          <div className="col-6 left-blue blue-content">
            <div className="Wallet-info-tag">
              <h4>Hakshatot Kiosk</h4>
            </div>
            <div className="revenue">
              <p>Account Name</p>
            </div>
          </div>
          <div className="col-6 blue-content right-blue">
            <div className="numbers">
              <img src={images.actionButton} alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 orange">
        <div className="row no-gutters blue-inner">
          <div className="col-6 left-blue blue-content">
            <div className="Wallet-info-tag">
              <h4>www.pointcity.co.il/Tel-Aviv/kioskaksatot</h4>
            </div>
            <div className="revenue">
              <p>Website</p>
            </div>
          </div>
          <div className="col-6 blue-content right-blue">
            <div className="numbers">
              <img src={images.actionButton} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletInfoDetails;
