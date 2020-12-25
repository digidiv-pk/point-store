import moment from 'moment';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import images from '../../../assets/img';
import { AuthContext, LanguageContext } from '../../../context';
import { AuthContextInterface } from '../../../context/AuthContext/AuthContext.interface';
import { CartEvents } from '../../../shared/enum';
import { CartEvent, CartFilterInterface, CartInterface, SubOrder } from '../../../shared/interface';

interface Props {
  orders: CartFilterInterface;
  loading: boolean;
  count: number;
}

function OrderHistoryTable(props: Props): JSX.Element {
  const context: AuthContextInterface = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const findStoreOrder = (order: CartInterface): SubOrder | null => {
    try {
      return order.orders?.find(
        (subOrder) => subOrder.store === context.state.user?.store,
      ) as SubOrder;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const getOrderStatus = (cartEvents: CartEvent[]): JSX.Element => {
    const events: CartEvents[] = [];
    cartEvents.forEach((e) => {
      events.push(e.event as CartEvents);
    });

    const style = { width: '80px' };

    if (events.includes(CartEvents.Completed)) {
      return <img src={images.statusIcon} alt="Order Completed" />;
    } else if (events.includes(CartEvents.Closed)) {
      return (
        <span className="badge badge-danger p-1" style={style}>
          Closed
        </span>
      );
    } else if (events.includes(CartEvents.Cancled)) {
      return (
        <span className="badge badge-danger p-1" style={style}>
          {languageContext.state.lang === 'en' && <>Canceled</>}
          {languageContext.state.lang === 'he' && <>בוטל</>}
        </span>
      );
    } else if (events.includes(CartEvents.Expired)) {
      return (
        <span className="badge badge-danger p-1" style={style}>
          Expired
        </span>
      );
    } else if (events.includes(CartEvents.NotProcessAble)) {
      return (
        <span className="badge badge-warning p-1" style={style}>
          NotProcessAble
        </span>
      );
    } else if (events.includes(CartEvents.Confirmed)) {
      return (
        <span className="badge badge-info p-1" style={style}>
          {languageContext.state.lang === 'en' && <>Confirmed</>}
          {languageContext.state.lang === 'he' && <>מאושר</>}
        </span>
      );
    } else if (events.includes(CartEvents.PendingConfirmation)) {
      return (
        <span className="badge badge-warning p-1" style={style}>
          PendingConfirmation
        </span>
      );
    } else if (events.includes(CartEvents.Created)) {
      return (
        <span className="badge badge-info p-1" style={style}>
          Created
        </span>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <div className="recent order-history">
        <p
          style={{
            textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
          }}>
          {languageContext.state.lang === 'en' && <>Order History</>}
          {languageContext.state.lang === 'he' && <>הסטוריית הזמנות</>}
        </p>
      </div>
      <table className="table active-order-table">
        <thead>
          <tr>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Order Number</>}
              {languageContext.state.lang === 'he' && <>מספר הזמנה</>}
            </th>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Date</>}
              {languageContext.state.lang === 'he' && <>תאריך</>}
            </th>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Time</>}
              {languageContext.state.lang === 'he' && <>שעה</>}
            </th>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Items</>}
              {languageContext.state.lang === 'he' && <>פריטים</>}
            </th>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Order Details</>}
              {languageContext.state.lang === 'he' && <>פרטי ההזמנה</>}
            </th>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Customer ID</>}
              {languageContext.state.lang === 'he' && <>מספר לקוח</>}
            </th>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Price</>}
              {languageContext.state.lang === 'he' && <>מחיר</>}
            </th>
            <th scope="col" className="th-center">
              {languageContext.state.lang === 'en' && <>Order Status</>}
              {languageContext.state.lang === 'he' && <>סטטוס הזמנה</>}
            </th>
          </tr>
        </thead>
        <tbody>
          {!props.loading &&
            props.orders.carts.map((order) => (
              <tr key={order.id}>
                <td scope="row">{order.id}</td>
                <td>
                  {order.createdAt ? moment(order.createdAt).format('DD-MM-YYYY') : '28/03/2020'}
                </td>
                <td>{order.createdAt ? moment(order.createdAt).format('hh:mm') : '13:30'}</td>
                <td className="item-col">
                  {findStoreOrder(order) &&
                    (findStoreOrder(order) as SubOrder).reservations
                      ?.map((reservation) => reservation.title as string)
                      .join(', ')}
                </td>
                <td className="th-center">
                  <Link to={'/order-cart/'.concat(order.id as string)}>
                    <img src={images.eyeIcon} />
                  </Link>
                </td>
                <td>{order.customer?.reference}</td>
                <td className="th-center">
                  ₪{findStoreOrder(order) && (findStoreOrder(order) as SubOrder).retail}
                </td>
                <td className="th-center">{getOrderStatus(order.events as CartEvent[])}</td>
              </tr>
            ))}
          {!props.loading && !props.orders.carts.length && (
            <tr>
              <td colSpan={8} className="th-center">
                {languageContext.state.lang === 'en' && <>No Records Found</>}
                {languageContext.state.lang === 'he' && <>לא נמצאו שיאים</>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {props.loading &&
        Array(props.count)
          .fill(1)
          .map((i, j) => (
            <div
              key={j}
              className="skeleton p-1"
              style={{
                width: '100%',
                height: '40px',
              }}>
              <div className="skeleton-rect skeleton-pulse" />
            </div>
          ))}
    </>
  );
}

export default OrderHistoryTable;
