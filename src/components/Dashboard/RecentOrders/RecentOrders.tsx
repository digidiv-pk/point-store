import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../../assets/img';
import { AuthContext, LanguageContext } from '../../../context';
import { AuthContextInterface } from '../../../context/AuthContext/AuthContext.interface';
import { CartEvents } from '../../../shared/enum';
import { CartEvent, CartFilterInterface } from '../../../shared/interface';
import { API } from '../../../utility';

function RecentOrders(): JSX.Element {
  const context: AuthContextInterface = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const [resentOrders, setResentOrders] = useState<CartFilterInterface>({
    carts: [],
    count: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    API.Store.recentOrders({
      store: context.state.user?.store,
      skip: 0,
      limit: 20,
    })
      .then((response) => {
        console.log('recentOrders', response);
        setLoading(false);
        setResentOrders(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  }, []);

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
      <div className="recent-order-main">
        <div className="recent">
          <p
            style={{
              textAlign: languageContext.state.direction === 'rtl' ? 'right' : 'left',
              fontWeight: 'bold',
            }}>
            {languageContext.state.lang === 'en' && <>Recent Orders</>}
            {languageContext.state.lang === 'he' && <>הזמנות אחרונות</>}
          </p>
        </div>
        <div className="table-container">
          <table className="table">
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
                  {languageContext.state.lang === 'en' && <>Customer ID</>}
                  {languageContext.state.lang === 'he' && <>מספר לקוח</>}
                </th>
                <th scope="col" className="th-center">
                  {languageContext.state.lang === 'en' && <>Items</>}
                  {languageContext.state.lang === 'he' && <>מוצרים</>}
                </th>
                <th scope="col" className="th-center">
                  {languageContext.state.lang === 'en' && <>Order Details</>}
                  {languageContext.state.lang === 'he' && <>פרטי ההזמנה</>}
                </th>
                <th scope="col" className="th-center">
                  {languageContext.state.lang === 'en' && <>Total</>}
                  {languageContext.state.lang === 'he' && <>סה"כ</>}
                </th>
                <th scope="col" className="th-center">
                  {languageContext.state.lang === 'en' && <>Order Status</>}
                  {languageContext.state.lang === 'he' && <>סטטוס הזמנה</>}
                </th>
              </tr>
            </thead>
            <tbody>
              {resentOrders.carts.map((order) => (
                <tr key={order.id}>
                  <td scope="row">{order.id}</td>
                  <td className="th-center">
                    {order.createdAt
                      ? moment(order.createdAt).format('DD-MM-YYYY')
                      : moment().toDate().toLocaleDateString()}
                  </td>
                  <td className="th-center">
                    {order.createdAt
                      ? moment(order.createdAt).format('HH:mm')
                      : moment().toDate().toLocaleTimeString()}
                  </td>
                  <td>{order.customer?.reference}</td>
                  <td className="item-col">
                    {order.orders
                      ?.filter((subOrder) => subOrder.store === context.state.user?.store)
                      .map((subOrder) =>
                        subOrder.reservations?.map((reservation) => reservation.title as string),
                      )
                      .join(', ')}
                  </td>
                  <td className="th-center">
                    <Link to={'/order-cart/'.concat(order.id as string)}>
                      <img src={images.eyeIcon} />
                    </Link>
                  </td>
                  <td className="th-center">{order.retail}</td>
                  <td className="th-center">{getOrderStatus(order.events as CartEvent[])}</td>
                </tr>
              ))}

              {!loading && !resentOrders.carts.length && (
                <tr>
                  <td colSpan={8} className="th-center">
                    {languageContext.state.lang === 'en' && <>No Records Found</>}
                    {languageContext.state.lang === 'he' && <>לא נמצאו שיאים</>}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading &&
            Array(5)
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
        </div>
        <div
          className="order-detail"
          style={{
            textAlign: languageContext.state.direction === 'rtl' ? 'left' : 'right',
          }}>
          <Link to="/recent-orders-list-page">
            {languageContext.state.lang === 'en' && <>View all orders</>}
            {languageContext.state.lang === 'he' && <>צפה בכל ההזמנות</>}
          </Link>
        </div>
      </div>
    </>
  );
}

export default RecentOrders;
