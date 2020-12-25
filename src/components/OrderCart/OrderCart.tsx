import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import socketIOClient from 'socket.io-client';
import { API } from 'utility';
import { AuthContext } from '../../context';
import {
  CartDeliveryEvents,
  CartEvents,
  StoreOrderEvents,
  StoreReservationEvents,
} from '../../shared/enum';
import {
  CartDeliveryEvent,
  CartInterface,
  OrderConfirmationRequest,
  StoreReservationEventInterface,
  SubOrder,
} from '../../shared/interface';
import { useRouter } from '../../utility/hooks';
import { Loading } from '../index';

function OrderCart(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const router = useRouter();
  const [order, setOrder] = useState<CartInterface>();
  const [orderConfirmRequest, setOrderConfirmRequest] = useState<OrderConfirmationRequest>({
    listingIds: [],
    cart: '',
  });

  const [orderUpdated, setOrderUpdated] = useState<boolean>(true);
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateOrderStatus = (data: CartInterface) => {
    let status = true;
    let statusString = '';
    const listingIds = [...orderConfirmRequest.listingIds];
    data.orders.forEach((o) => {
      statusString = o.events?.length
        ? (o.events[o.events.length - 1].event as StoreOrderEvents)
        : '';
      o.reservations?.forEach((r) => {
        if (status) {
          status = !!r.events?.length;
        }
        listingIds.push({
          available: false,
          product: r.product as string,
        });
      });
    });
    // @ts-ignore
    const { orderId } = router.match.params;
    setOrderConfirmRequest({
      listingIds,
      cart: orderId,
    });
    setOrderUpdated(status);
    setOrderStatus(statusString);
  };

  const getOrderItems = () => {
    // @ts-ignore
    const { orderId } = router.match.params;
    setOrderConfirmRequest({
      ...orderConfirmRequest,
      cart: orderId,
    });
    setLoading(true);
    console.log(orderId);
    API.Order.byId({
      id: orderId,
    })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setOrder(response.data);
        updateOrderStatus(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error.response);
      });
    console.log(order);
  };

  const submitOrdersStatus = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);
    API.Order.confirm(orderConfirmRequest)
      .then((respone) => {
        console.log(respone);
        setLoader(false);
        toast.success('Order Status Updated Successfully');
        getOrderItems();
      })
      .catch((error) => {
        setLoader(false);
        console.error(error.response);
        toast.error('There is an error during update Order Status');
      });
  };

  const connectSocketIo = () => {
    // @ts-ignore
    const { orderId } = router.match.params;
    const url = new URL(API.BASE_URL);
    url.searchParams.set('token', context.state.user?.authToken as string);
    url.searchParams.set('store', context.state.user?.store as string);
    const socket = socketIOClient(url.href);

    socket.on('connect', (data: any) => {
      console.log('socketIOClient connect', data);
    });
    socket.on('update', (cart: CartInterface) => {
      if (cart.id === orderId) {
        setOrder(cart);
      }
      console.log('socketIOClient update', cart);
    });
    socket.on('disconnect', (data: any) => {
      console.error('socketIOClient disconnect', data);
    });
  };

  useEffect(() => {
    getOrderItems();
    connectSocketIo();
  }, []);

  const getEventText = (events: StoreReservationEventInterface[]) => {
    let event = '';
    events.forEach((item) => {
      if (!event) {
        event = item.event as StoreReservationEvents;
      }
    });
    return event === StoreReservationEvents.ItemAvailable ? 'Available' : 'Not Available';
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>, product: string) => {
    const index = orderConfirmRequest.listingIds.findIndex((item) => item.product === product);
    const listingIds = JSON.parse(JSON.stringify(orderConfirmRequest.listingIds));
    const available = event.target.value === '1';
    listingIds[index] = {
      product,
      available,
    };
    setOrderConfirmRequest({
      ...orderConfirmRequest,
      listingIds,
    });
  };

  const getSelectValue = (product: string): string => {
    const index = orderConfirmRequest.listingIds.findIndex((item) => item.product === product);
    const listingIds = [...orderConfirmRequest.listingIds];
    if (index !== -1) {
      return listingIds[index].available ? '1' : '0';
    } else {
      return '';
    }
  };

  const findStoreOrder = (orders: SubOrder[]): SubOrder | undefined => {
    try {
      return orders.find((item) => item.store === context.state.user?.store);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const ifElseJSX = (
    condition: boolean,
    ifComponent: JSX.Element,
    elseComponent: JSX.Element,
  ): JSX.Element => {
    if (condition) {
      return ifComponent;
    } else {
      return elseComponent;
    }
  };

  const readyOrder = () => {
    // @ts-ignore
    const { orderId } = router.match.params;
    API.Order.ready({
      cartId: orderId,
    })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const dispatchOrder = () => {
    // @ts-ignore
    const { orderId } = router.match.params;
    API.Order.dispatch({
      cartId: orderId,
    })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const orderStatusButton = (): JSX.Element => {
    if (order) {
      const orderEvents: StoreOrderEvents[] = [];
      const deliveryEvents: CartDeliveryEvents[] = [];
      const cartEvents: CartEvents[] = [];
      order.events?.forEach((e) => {
        cartEvents.push(e.event as CartEvents);
      });
      order?.orders.forEach((o) => {
        if (o.events?.length) {
          o.events.forEach((e) => {
            orderEvents.push(e.event as StoreOrderEvents);
          });
        }
      });
      (order?.delivery?.events as CartDeliveryEvent[]).forEach((e) => {
        deliveryEvents.push(e.event as CartDeliveryEvents);
      });

      if (cartEvents.includes(CartEvents.Completed)) {
        return (
          <button type="button" className="position-p btn-info">
            Completed
          </button>
        );
      } else if (orderEvents.includes(StoreOrderEvents.OrderDispatched)) {
        return (
          <button type="button" className="position-p bg-green">
            Order Dispatched
          </button>
        );
      } else if (orderEvents.includes(StoreOrderEvents.Arrived)) {
        if (deliveryEvents.includes(CartDeliveryEvents.ASSIGNED)) {
          return (
            <button type="button" onClick={dispatchOrder} className="position-p bg-orange">
              Dispatch Order
            </button>
          );
        } else {
          return (
            <button type="button" className="position-p bg-gray">
              No Delivery Boy Assigned
            </button>
          );
        }
      } else if (orderEvents.includes(StoreOrderEvents.OrderReady)) {
        return (
          <button type="button" className="position-p bg-gray">
            Waiting For Delivery Boy
          </button>
        );
      } else if (orderEvents.includes(StoreOrderEvents.WillDeliverOrder)) {
        return (
          <button type="button" onClick={readyOrder} className="position-p bg-orange">
            Ready Order
          </button>
        );
      } else {
        return (
          <button type="button" className="position-p bg-gray">
            {!!orderStatus ? orderStatus : 'Order Status'}
          </button>
        );
      }
    } else {
      return (
        <button type="button" className="position-p bg-gray">
          Order Status
        </button>
      );
    }
  };

  return (
    <>
      {loader && <Loading />}
      <div className="orderview">
        {!loading && orderUpdated && <>{orderStatusButton()}</>}
        {!orderUpdated && (
          <button
            className="btn position-p btn-primary"
            disabled={!orderConfirmRequest.listingIds.length}
            onClick={submitOrdersStatus}>
            Update State
          </button>
        )}

        <div className="row m-0 d-flex flex-row justify-content-center align-items-center w-100">
          <div className="col-6">
            <div className="left-top w-100">
              <p>
                {ifElseJSX(
                  loading,
                  <div
                    className="skeleton"
                    style={{
                      width: '300px',
                      fontSize: '20px',
                    }}>
                    <div className="skeleton-text skeleton-pulse" />
                  </div>,
                  <>
                    <b>Cart ID:</b> {order?.id}
                  </>,
                )}
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="left-top">
              <p>
                {ifElseJSX(
                  loading,
                  <div
                    className="skeleton"
                    style={{
                      width: '300px',
                      fontSize: '20px',
                    }}>
                    <div className="skeleton-text skeleton-pulse" />
                  </div>,
                  <>
                    <b>Customer ID:</b> {order?.customer?.reference}
                  </>,
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Product Id</th>
              <th scope="col">Title</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
              <th scope="col" style={{ width: '200px' }}>
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {!!order && !!order?.orders.length && findStoreOrder(order?.orders as SubOrder[]) && (
              <>
                {(findStoreOrder(order?.orders as SubOrder[]) as SubOrder).reservations?.map(
                  (reservation, index) => (
                    <tr key={index}>
                      <td scope="row">{reservation.id}</td>
                      <td>{reservation.product}</td>
                      <td className="th-center">{reservation.title}</td>
                      <td className="th-center">{reservation.quantity}</td>
                      <td className="th-center">{reservation.retail}</td>
                      <td className="th-center">{reservation.totalStoreFacing}</td>
                      {!!reservation.events?.length && (
                        <td className="th-center">{getEventText(reservation.events)}</td>
                      )}
                      {!reservation.events?.length && (
                        <td className="th-center">
                          <select
                            className="form-control"
                            value={getSelectValue(reservation.product as string)}
                            onChange={(event) =>
                              handleChangeSelect(event, reservation.product as string)
                            }>
                            <option value="" disabled={true}>
                              Select Option
                            </option>
                            <option value="1">Available</option>
                            <option value="0">Not Available</option>
                          </select>
                        </td>
                      )}
                    </tr>
                  ),
                )}
              </>
            )}
            {!loading && !!order && !order?.orders.length && (
              <tr>
                <td className="th-center" colSpan={7}>
                  No Record Found
                </td>
              </tr>
            )}
            {!loading && !order && (
              <tr>
                <td className="th-center" colSpan={7}>
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="col-12">
          {!!order && (
            <>
              {!!findStoreOrder(order?.orders as SubOrder[]) && (
                <>
                  {!!(findStoreOrder(order?.orders as SubOrder[]) as SubOrder).instruction && (
                    <>
                      <h5>
                        <b>Instructions:</b>
                      </h5>
                      <p>{(findStoreOrder(order?.orders as SubOrder[]) as SubOrder).instruction}</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
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
        <div className="row m-0 pt-4 d-flex flex-row justify-content-center align-items-center w-100">
          <div className="col-4">
            <div className="left-top w-100">
              <p>
                {ifElseJSX(
                  loading,
                  <div
                    className="skeleton"
                    style={{
                      width: '300px',
                      fontSize: '20px',
                    }}>
                    <div className="skeleton-text skeleton-pulse" />
                  </div>,
                  <>
                    <b>Store Facing:</b> {order?.orders[0].storeFacing}
                  </>,
                )}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="left-top">
              <p>
                {ifElseJSX(
                  loading,
                  <div
                    className="skeleton"
                    style={{
                      width: '300px',
                      fontSize: '20px',
                    }}>
                    <div className="skeleton-text skeleton-pulse" />
                  </div>,
                  <>
                    <b>Total Retail:</b> {order?.totalRetail}
                  </>,
                )}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="left-top">
              <p>
                {ifElseJSX(
                  loading,
                  <div
                    className="skeleton"
                    style={{
                      width: '300px',
                      fontSize: '20px',
                    }}>
                    <div className="skeleton-text skeleton-pulse" />
                  </div>,
                  <>
                    <b>Discount:</b> {order?.discount}
                  </>,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCart;
