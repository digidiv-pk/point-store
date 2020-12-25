import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components';

function Router(): JSX.Element {
  return (
    <Switch>
      <Route component={(): JSX.Element => <Redirect to="/login" />} exact={true} path="/" />
      <Route
        component={lazy((): Promise<any> => import('views/Login'))}
        exact={true}
        path="/login"
      />
      <Route
        component={lazy((): Promise<any> => import('views/Register'))}
        exact={true}
        path="/register"
      />
      <Route
        component={lazy((): Promise<any> => import('views/CreatePassword'))}
        exact={true}
        path="/createPassword/:token"
      />
      <Route
        component={lazy((): Promise<any> => import('views/ForgotPassword'))}
        exact={true}
        path="/forgotPassword"
      />
      <ProtectedRoute
        component={lazy((): Promise<any> => import('layouts/DefaultLayout'))}
        path="/"
        data={{
          all: true,
        }}
      />
    </Switch>
  );
}

export default Router;
