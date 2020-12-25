import { WalletUsers } from 'components/WalletInfo';
import { OperatingHours, PaymentDetails, TechnicalSetting } from 'components/WalletInfo/Cards';
import { PageTitle, WalletInfoDetails } from 'components';
import React from 'react';

function SecondWallet(): JSX.Element {
  return (
    <>
      <PageTitle title="Wallet Settings" />
      <div className="new_backGround">
        <WalletInfoDetails />
        <WalletUsers />
        <div className="row no-gutters main-card">
          <div className="col-6 pr-3">
            <TechnicalSetting />
          </div>
          <div className="col-6">
            <PaymentDetails />
            <OperatingHours />
          </div>
        </div>
      </div>
    </>
  );
}

export default SecondWallet;
