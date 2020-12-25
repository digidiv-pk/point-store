import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

function Router(): JSX.Element {
  // @ts-ignore
  return (
    <Switch>
      <Route
        component={lazy((): Promise<any> => import('views/Dashboard'))}
        exact={true}
        path="/dashboard"
      />
      <Route
        component={lazy((): Promise<any> => import('views/Orders'))}
        exact={true}
        path="/orders"
      />
      <Route
        component={lazy((): Promise<any> => import('views/HelpAndSupport'))}
        exact={true}
        path="/helpAndSupport"
      />
      <Route
        component={lazy((): Promise<any> => import('views/OrdersTracking'))}
        exact={true}
        path="/orders-tracking"
      />
      <Route
        component={lazy((): Promise<any> => import('views/Modals'))}
        exact={true}
        path="/modals"
      />
      <Route
        component={lazy((): Promise<any> => import('views/Reports'))}
        exact={true}
        path="/reports"
      />
      <Route
        component={lazy((): Promise<any> => import('views/Wallet'))}
        exact={true}
        path="/wallet"
      />
      <Route
        component={lazy((): Promise<any> => import('views/SecondWallet'))}
        exact={true}
        path="/secondwallet"
      />
      <Route
        component={lazy((): Promise<any> => import('views/Products'))}
        exact={true}
        path="/products"
      />
      <Route
        component={lazy((): Promise<any> => import('views/ProductsVIew'))}
        exact={true}
        path="/products-list"
      />
      <Route
        component={lazy((): Promise<any> => import('views/OrderCart'))}
        exact={true}
        path="/order-cart/:orderId"
      />
      <Route
        component={lazy((): Promise<any> => import('views/RecentOrdersListPage'))}
        exact={true}
        path="/recent-orders-list-page"
      />
      <Route
        component={lazy((): Promise<any> => import('views/SecuritySettings'))}
        exact={true}
        path="/security-settings"
      />
      <Route
        component={lazy((): Promise<any> => import('views/BusinessSettings'))}
        exact={true}
        path="/business-settings"
      />
      <Route
        component={lazy((): Promise<any> => import('views/GeneralSettings'))}
        exact={true}
        path="/general-settings"
      />
      <Route
        component={lazy((): Promise<any> => import('views/UserSettings'))}
        exact={true}
        path="/user-settings"
      />
    </Switch>
  );
}

export default Router;
