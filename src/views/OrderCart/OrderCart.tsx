import OrderCart from 'components/OrderCart';
import React from 'react';
import './ordercard.scss';
import { PageLocking, PageTitle } from '../../components';

function OrderCartView(): JSX.Element {
  return (
    <>
      <PageTitle title="Order Details" />
      <PageLocking page="order-cart">
        <OrderCart />
      </PageLocking>
    </>
  );
}

export default OrderCartView;
