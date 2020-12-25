import 'assets/scss/modals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext, LanguageContext } from 'context';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'views/HelpAndSupport/HelpAndSupport.scss';
import './App.scss';
import './assets/scss/Dashboard.scss';
import { Preloader } from './components';
import Router from './Router';

function App(): JSX.Element {
  return (
    <Suspense fallback={<Preloader />}>
      <LanguageContext.Provider>
        <BrowserRouter>
          <ToastContainer />
          <AuthContext.Provider>
            <Router />
          </AuthContext.Provider>
        </BrowserRouter>
      </LanguageContext.Provider>
    </Suspense>
  );
}

export default App;
