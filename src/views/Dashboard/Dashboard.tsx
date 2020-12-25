import { ActiveOrders, PageLocking, PageTitle, RecentOrders, Slider } from 'components';
import React, { useContext } from 'react';
import { LanguageContext } from '../../context';

function Dashboard(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  return (
    <>
      <PageTitle title={languageContext.state.lang === 'en' ? 'Dashboard' : 'לוח בקרה'} />
      <PageLocking page="dashboard">
        <RecentOrders />
        <ActiveOrders />
        <Slider />
      </PageLocking>
    </>
  );
}

export default Dashboard;
