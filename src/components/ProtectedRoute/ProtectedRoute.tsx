import React, { useContext } from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';

interface RouteData {
  role?: string;
  roles?: string[];
  all?: boolean;
}

interface ProtectedRouteProps extends RouteProps {
  data: RouteData;
}

function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
  const context = useContext<AuthContextInterface>(AuthContext.Context);
  if (context.state.loggedIn) {
    if (props.data.all) {
      return <Route {...props} />;
    }
  }
  return <Route {...props} component={(): JSX.Element => <Redirect to="/login" />} />;
}

export default ProtectedRoute;
