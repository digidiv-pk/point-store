import { AuthContext } from 'context';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Footer, Header } from '../../components';
import SideNav from '../../components/SideNav';
import { useRouter } from '../../utility/hooks';
import Router from './Router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function DefaultLayout(props: RouteComponentProps): JSX.Element {
  const context = useContext(AuthContext.Context);
  const router = useRouter();
  useEffect(() => {
    if (context.state.loggedIn) {
      if (!context.state.user?.store) {
        router.history.push('/register');
      }
    }
  }, [context]);

  return (
    <>
      <div
        className="d-flex"
        id="wrapper"
        style={{
          minHeight: 'calc(100vh - 30px)',
        }}>
        {/*<!-- Sidebar --> */}
        <div className="bg-light border-right side-bar" id="sidebar-wrapper">
          <SideNav />
        </div>
        {/* <!-- /#sidebar-wrapper --> */}

        {/*<!-- Page Content --> */}

        <div
          className="container-fluid p-0"
          style={{
            height: 'calc(100vh - 30px)',
            overflow: 'auto',
          }}>
          <Header />
          <Router />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
