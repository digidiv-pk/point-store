import React from 'react';
import { PageTitle } from '../../components';

function GeneralSettings(): JSX.Element {
  return (
    <div className="row p-4">
      <PageTitle title="General Settings" />
      <div className="col-6">
        <div className="card text-center">
          <div
            className="card-header d-inline-flex justify-content-center align-items-center w-100"
            style={{
              backgroundColor: '#f2f2f2',
            }}>
            Pages Security
          </div>
          <div className="card-body"></div>
        </div>
      </div>
      <div className="col-6">
        <div className="card-body"></div>
      </div>
    </div>
  );
}

export default GeneralSettings;
