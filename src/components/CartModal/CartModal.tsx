import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context';
import { StoreReservationEvents } from '../../shared/enum';
import {
  CartInterface,
  OrderConfirmationRequest,
  ProductAvailability,
  StoreReservationEventInterface,
  SubOrder,
} from '../../shared/interface';
import { API } from '../../utility';
import { Loading } from '../index';
import './CartModal.scss';

interface Props {
  show: boolean;
  data?: CartInterface;

  onHide(): void;
}

function CartModal(props: Props): JSX.Element {
  const context = useContext(AuthContext.Context);
  const [orderConfirmRequest, setOrderConfirmRequest] = useState<OrderConfirmationRequest>({
    listingIds: [],
    cart: '',
  });
  const [loader, setLoader] = useState<boolean>(false);

  const generateProductListingStatus = (status: boolean): ProductAvailability[] => {
    const listingIds: ProductAvailability[] = [];
    (props.data as CartInterface).orders.forEach((o) => {
      o.reservations?.forEach((r) => {
        listingIds.push({
          available: status,
          product: r.product as string,
        });
      });
    });
    return listingIds;
  };

  const updateOrderStatus = (status: boolean) => {
    setOrderConfirmRequest({
      listingIds: generateProductListingStatus(status),
      cart: props.data?.id as string,
    });
  };

  useEffect(() => {
    if (props.data) {
      updateOrderStatus(false);
      setTimeout(() => {
        props.onHide();
      }, 60000);
    }
  }, [props.data]);

  const submitOrdersStatus = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);
    API.Order.confirm(orderConfirmRequest)
      .then((respone) => {
        console.log(respone);
        setLoader(false);
        toast.success('Order Status Updated Successfully');
        props.onHide();
      })
      .catch((error) => {
        setLoader(false);
        console.error(error.response);
        toast.error('There is an error during update Order Status');
      });
  };

  const rejectOrdersStatus = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);
    API.Order.confirm({
      cart: orderConfirmRequest.cart,
      listingIds: generateProductListingStatus(false),
    })
      .then((respone) => {
        console.log(respone);
        setLoader(false);
        toast.success('Order Status Updated Successfully');
        props.onHide();
      })
      .catch((error) => {
        setLoader(false);
        console.error(error.response);
        toast.error('There is an error during update Order Status');
      });
  };

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
    return orders.find((item) => item.store === context.state.user?.store);
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      dialogClassName="cart-modal-main">
      <div className="modal-header round d-flex flex-column justify-content-center align-items-center">
        <p>New Order</p>
      </div>
      {loader && <Loading />}
      <div className="modal-body">
        <div className="orderview">
          <div className="row m-0 d-flex flex-row justify-content-center align-items-center w-100">
            <div className="col-4">
              <div className="left-top w-100">
                {props.data && (
                  <p>
                    <b>Cart ID:</b> {props.data?.id}
                  </p>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="left-top">
                {props.data && (
                  <p>
                    <b>Customer ID:</b> {props.data?.customer?.cname}
                  </p>
                )}
              </div>
            </div>
            <div className="col-4">
              <select
                className="form-control"
                onChange={(event) => updateOrderStatus(event.target.value === '1')}>
                <option value="" selected={true} disabled={true}>
                  Mark All Orders
                </option>
                <option value="1">Available</option>
                <option value="0">Not Available</option>
              </select>
            </div>
          </div>
          <div className="clearfix" />
          <table className="table reports-table">
            <thead>
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Title</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col">Discount</th>
                <th scope="col">Availability</th>
              </tr>
            </thead>
            <tbody>
              {!!props.data && !!findStoreOrder(props.data?.orders) && (
                <>
                  {(findStoreOrder(props.data?.orders as SubOrder[]) as SubOrder).reservations?.map(
                    (reservation, index) => (
                      <tr key={index}>
                        <td scope="row">{reservation.product}</td>
                        <td>{reservation.title}</td>
                        <td>{reservation.quantity}</td>
                        <td>{reservation.retail}</td>
                        <td>{reservation.totalRetail}</td>
                        <td>{reservation.discount}</td>
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
            </tbody>
          </table>

          <div className="row m-0 pt-4 d-flex flex-row justify-content-center align-items-center w-100">
            <div className="col-12">
              {!!props.data && (
                <>
                  {!!findStoreOrder(props.data?.orders as SubOrder[]) && (
                    <>
                      {!!(findStoreOrder(props.data?.orders as SubOrder[]) as SubOrder)
                        .instruction && (
                        <>
                          <h5>
                            <b>Instructions:</b>
                          </h5>
                          <p>
                            {
                              (findStoreOrder(props.data?.orders as SubOrder[]) as SubOrder)
                                .instruction
                            }
                          </p>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="col-4">
              <div className="left-top w-100">
                {props.data && (
                  <p>
                    <b>Retail: {props.data?.retail}</b>
                  </p>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="left-top">
                {props.data && (
                  <p>
                    <b>Total Retail: {props.data?.totalRetail}</b>
                  </p>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="left-top">
                {props.data && (
                  <p>
                    <b>Discount: {props.data?.discount}</b>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="accept-reject">
          <button
            type="button"
            className=" btn submit-btn accept mr-3"
            disabled={!orderConfirmRequest.listingIds.length}
            onClick={submitOrdersStatus}>
            Accept
          </button>
          <button type="button" className=" btn submit-btn reject" onClick={rejectOrdersStatus}>
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
