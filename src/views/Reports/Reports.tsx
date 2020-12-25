import React from 'react';
import { ReportsTable } from 'components/Reports';
import { PageTitle, ReportsSearchField } from 'components';

function Reports(): JSX.Element {
  return (
    <>
      <PageTitle title="Reports" />
      <ReportsSearchField />
      <div className="outer-reports-table">
        <ReportsTable />
      </div>
    </>
  );
}

export default Reports;
