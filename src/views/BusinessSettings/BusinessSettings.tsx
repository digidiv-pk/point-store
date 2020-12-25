import React, { memo, useContext } from 'react';
import { PageTitle } from '../../components';
import { LanguageContext } from '../../context';
import {
  BusinessSettingsHeader,
  GeneralInformation,
  OperatingHours,
  PaymentDetails,
  PointStoreUsers,
} from './components';

function BusinessSettings(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  return (
    <div className="row no-gutters bg-white">
      <PageTitle
        title={languageContext.state.lang === 'en' ? 'Business Settings' : 'הגדרות עסקיות'}
      />
      <div className="col-12">
        <BusinessSettingsHeader />
      </div>
      <GeneralInformation />
      <div className="col-6 px-2">
        <PaymentDetails />
      </div>
      <div className="col-6 px-2">
        <OperatingHours />
      </div>
      <div className="col-12 px-2">
        <PointStoreUsers />
      </div>
    </div>
  );
}

export default memo(BusinessSettings);
