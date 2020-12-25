import moment from 'moment';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/img';
import { AuthContext, LanguageContext } from '../../context';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';
import { StoreOrderEvents } from '../../shared/enum';
import { CartFilterInterface, CartInterface, SubOrder } from '../../shared/interface';

interface Props {
  orders: CartFilterInterface;
  loading: boolean;
  count: number;
}

function OrderManagementTable(props: Props): JSX.Element {
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
  const getOrderStatus = (subOrders: SubOrder[]): JSX.Element => {
    const order: SubOrder | undefined = subOrders.find(
      (item) => item.store === (context.state.user?.store as string),
    );
    if (!!order) {
      const includes = (e: StoreOrderEvents) => {
        const eventsList: StoreOrderEvents[] = [];
        // @ts-ignore
        order.events.forEach((event) => {
          eventsList.push(event.event as StoreOrderEvents);
        });
        return eventsList.includes(e);
      };
      // @ts-ignore
      if (order.events.length) {
        if (includes(StoreOrderEvents.OrderDispatched)) {
          return (
            <label className="green-lable">
              {languageContext.state.lang === 'en' && <>Picked Up</>}
              {languageContext.state.lang === 'he' && <>הזמנה נאספה</>}
            </label>
          );
        } else if (includes(StoreOrderEvents.OrderReady)) {
          return (
            <label className="orange-lable">
              {languageContext.state.lang === 'en' && <>Order Ready</>}
              {languageContext.state.lang === 'he' && <>מוכן לאיסוף</>}
            </label>
          );
        } else if (includes(StoreOrderEvents.WillDeliverOrder)) {
          return (
            <label className="red-lable">
              {languageContext.state.lang === 'en' && <>Available</>}
              {languageContext.state.lang === 'he' && <>זמין</>}
            </label>
          );
        } else {
          return <label className="gray-lable">Pending</label>;
        }
      } else {
        return <label className="gray-lable">Pending</label>;
      }
    } else {
      return <label className="gray-lable">Pending</label>;
    }
  };
  return (
    <>
      <div className="status-icon new-status-icon">
        <ul>
          <li>
            <img src={images.redCheckbox} height={20} />
            <p>
              {languageContext.state.lang === 'en' && <>Available</>}
              {languageContext.state.lang === 'he' && <>זמין</>}
            </p>
          </li>
          <li>
            <img src={images.orangeCheckbox} height={20} />
            <p>
              {languageContext.state.lang === 'en' && <>Order Ready</>}
              {languageContext.state.lang === 'he' && <>מוכן לאיסוף</>}
            </p>
          </li>
          <li>
            <img src={images.greenCheckbox} height={20} />
            <p>
              {languageContext.state.lang === 'en' && <>Picked Up</>}
              {languageContext.state.lang === 'he' && <>הזמנה נאספה</>}
            </p>
          </li>
        </ul>
      </div>
      <table className="table second-table hs-table">
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
              {languageContext.state.lang === 'he' && <>מוצרים</>}
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
                <td className="th-center">
                  {order.createdAt ? moment(order.createdAt).format('DD-MM-YYYY') : '28/03/2020'}
                </td>
                <td className="th-center">
                  {order.createdAt ? moment(order.createdAt).format('hh:mm') : '13:30'}
                </td>
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
                <td>{getOrderStatus(order.orders || [])}</td>
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

export default OrderManagementTable;
