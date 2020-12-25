import moment from 'moment';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { distinctUntilChanged } from 'rxjs/operators';
import socketIOClient from 'socket.io-client';
import images from '../../../assets/img';
import { AuthContext, LanguageContext } from '../../../context';
import { AuthContextInterface } from '../../../context/AuthContext/AuthContext.interface';
import { ActiveOrdersService } from '../../../services';
import { StoreOrderEvents } from '../../../shared/enum';
import { CartFilterInterface, CartInterface, SubOrder } from '../../../shared/interface';
import { API } from '../../../utility';

interface Style {
  th: CSSProperties;
}

const style: Style = {
  th: {
    whiteSpace: 'nowrap',
  },
};

function ActiveOrders(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [orders, setOrders] = useState<CartFilterInterface>({
    carts: [],
    count: 0,
  });
  const instance = ActiveOrdersService.getInstance();
  const [loading, setLoading] = useState<boolean>(false);
  const context: AuthContextInterface = useContext(AuthContext.Context);

  const getActiveOrdersList = () => {
    const store = [];
    setLoading(true);
    if (context.state.user?.store) {
      store.push(context.state.user?.store);
    }
    API.Order.filter({
      order: {
        store,
      },
      eventsInclude: ['Created'],
      eventsExclude: ['Cancled', 'Completed', 'Expired', 'Closed'],
    })
      .then((response) => {
        instance.update(response.data.carts);
        console.log('filter', response);
        const data = { ...response.data };
        data.carts.sort((a, b) => {
          return (
            new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
          );
        });
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  };

  const connectSocketIo = () => {
    const url = new URL(API.BASE_URL);
    url.searchParams.set('token', context.state.user?.authToken as string);
    url.searchParams.set('store', context.state.user?.store as string);
    const socket = socketIOClient(url.href);

    socket.on('connect', (data: any) => {
      console.log('socketIOClient connect', data);
    });
    socket.on('update', (cart: CartInterface) => {
      getActiveOrdersList();
      console.log('socketIOClient update', cart);
    });
    socket.on('disconnect', (data: any) => {
      console.error('socketIOClient disconnect', data);
    });
  };

  useEffect(() => {
    instance.observable
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((data) => {
        console.log('distinctUntilChanged', data);
        setOrders({
          ...orders,
          carts: data,
        });
      });
    getActiveOrdersList();
    connectSocketIo();
  }, []);

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
      <div className="row no-gutters">
        <div className="col-9 main-activ-order">
          <div className="outer-active-order">
            <div className="active-order1">
              <p style={{ fontWeight: 'bold' }}>
                {languageContext.state.lang === 'en' && <>Active Orders</>}
                {languageContext.state.lang === 'he' && <>הזמנות פעילות</>}
              </p>
            </div>
            <div className="status-icon">
              <ul>
                <li>
                  <img src={images.redCheckbox} height={20} />
                  <p
                    style={{
                      paddingRight: languageContext.state.direction === 'ltr' ? '20px' : undefined,
                      paddingLeft: languageContext.state.direction === 'rtl' ? '20px' : undefined,
                    }}>
                    {languageContext.state.lang === 'en' && <>Available</>}
                    {languageContext.state.lang === 'he' && <>זמין</>}
                  </p>
                </li>
                <li>
                  <img src={images.orangeCheckbox} height={20} />
                  <p
                    style={{
                      paddingRight: languageContext.state.direction === 'ltr' ? '20px' : undefined,
                      paddingLeft: languageContext.state.direction === 'rtl' ? '20px' : undefined,
                    }}>
                    {languageContext.state.lang === 'en' && <>Ready For Pickup</>}
                    {languageContext.state.lang === 'he' && <>מוכן לאיסוף</>}
                  </p>
                </li>
                <li>
                  <img src={images.greenCheckbox} height={20} />
                  <p
                    style={{
                      paddingRight: languageContext.state.direction === 'ltr' ? '20px' : undefined,
                      paddingLeft: languageContext.state.direction === 'rtl' ? '20px' : undefined,
                    }}>
                    {languageContext.state.lang === 'en' && <>Order Picked Up</>}
                    {languageContext.state.lang === 'he' && <>הזמנה נאספה</>}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="scroll">
            <table className="table second-table ">
              <thead>
                <tr className="bt">
                  <th scope="col" style={style.th} className="th-center">
                    {languageContext.state.lang === 'en' && <>Order Number</>}
                    {languageContext.state.lang === 'he' && <>מספר הזמנה</>}
                  </th>
                  <th scope="col" style={style.th} className="th-center">
                    {languageContext.state.lang === 'en' && <>Date</>}
                    {languageContext.state.lang === 'he' && <>תאריך</>}
                  </th>
                  <th scope="col" style={style.th} className="th-center">
                    {languageContext.state.lang === 'en' && <>Time</>}
                    {languageContext.state.lang === 'he' && <>שעה</>}
                  </th>
                  <th scope="col" style={style.th} className="th-center">
                    {languageContext.state.lang === 'en' && <>Customer ID</>}
                    {languageContext.state.lang === 'he' && <>מספר לקוח</>}
                  </th>
                  <th scope="col" style={style.th} className="th-center">
                    {languageContext.state.lang === 'en' && <>Items</>}
                    {languageContext.state.lang === 'he' && <>מוצרים</>}
                  </th>
                  <th scope="col" style={style.th} className="th-center">
                    {languageContext.state.lang === 'en' && <>Order Details</>}
                    {languageContext.state.lang === 'he' && <>פרטי ההזמנה</>}
                  </th>
                  <th scope="col" style={style.th} className="th-center">
                    {languageContext.state.lang === 'en' && <>Order Status</>}
                    {languageContext.state.lang === 'he' && <>סטטוס הזמנה</>}
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.carts.map((order, index) => (
                  <tr key={index}>
                    <td scope="row">{order.id}</td>
                    <td className="th-center item-col">
                      {order.createdAt
                        ? moment(order.createdAt).format('DD-MM-YYYY')
                        : '28/03/2020'}
                    </td>
                    <td className="th-center">
                      {order.createdAt ? moment(order.createdAt).format('HH:mm') : '13:30'}
                    </td>
                    <td>{order.customer?.reference}</td>
                    <td className="th-center item-col">
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
                    <td>{getOrderStatus(order.orders || [])}</td>
                  </tr>
                ))}
                {!loading && !orders.carts.length && (
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
              Array(10)
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
        </div>
        <div className="col-3 pr-0 pl-0 call ">
          <div className="contact-sect">
            <div className="question-links">
              <a href="" className="not-arround">
                {languageContext.state.lang === 'en' && <>What if you’re not around?</>}
                {languageContext.state.lang === 'he' && <>לא זמינים?</>}
              </a>
              <a href="" className="notify">
                {languageContext.state.lang === 'en' && <>How should we notify you?</>}
                {languageContext.state.lang === 'he' && <>כיצד עלינו להודיע לכם שיש הזמנה חדשה?</>}
              </a>
              <div className="call-buttons">
                <button>
                  {languageContext.state.lang === 'en' && <>Receive a phone call</>}
                  {languageContext.state.lang === 'he' && <>קבל התראה בשיחה קולית</>}
                </button>
                <button>
                  {languageContext.state.lang === 'en' && <>Receive an SMS</>}
                  {languageContext.state.lang === 'he' && <>קבל התראה בסמס</>}
                </button>
                <button>
                  {languageContext.state.lang === 'en' && <>Receive an E-mail notification</>}
                  {languageContext.state.lang === 'he' && <>קבל התראה במייל</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActiveOrders;
