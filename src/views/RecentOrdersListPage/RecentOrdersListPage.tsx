import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/img';
import { PageLocking, PageTitle, Pagination } from '../../components';
import { AuthContext } from '../../context';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';
import { CartEvents } from '../../shared/enum';
import { CartEvent, CartFilterInterface, PaginationInterface } from '../../shared/interface';
import { API } from '../../utility';
import './RecentOrdersListPage.scss';

function RecentOrdersListPage(): JSX.Element {
  const [resentOrders, setResentOrders] = useState<CartFilterInterface>({
    carts: [],
    count: 0,
  });

  const [pagination, setPagination] = useState<PaginationInterface>({
    limit: 25,
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const context: AuthContextInterface = useContext(AuthContext.Context);
  const getRecentOrders = () => {
    setLoading(true);
    API.Store.recentOrders({
      store: context.state.user?.store,
      skip: (pagination.page - 1) * pagination.limit,
      limit: pagination.limit,
    })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setPagination({
          ...pagination,
          pages: Math.ceil(response.data.count / pagination.limit),
        });
        setResentOrders(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  };
  useEffect(() => {
    getRecentOrders();
  }, [pagination.limit, pagination.page]);
  const getOrderStatus = (cartEvents: CartEvent[]): JSX.Element => {
    const events: CartEvents[] = [];
    cartEvents.forEach((e) => {
      events.push(e.event as CartEvents);
    });

    if (events.includes(CartEvents.Completed)) {
      return <img src={images.statusIcon} alt="Order Completed" />;
    } else if (events.includes(CartEvents.Closed)) {
      return <span className="badge badge-danger p-1">Closed</span>;
    } else if (events.includes(CartEvents.Cancled)) {
      return <span className="badge badge-danger p-1">Canceled</span>;
    } else if (events.includes(CartEvents.Expired)) {
      return <span className="badge badge-danger p-1">Expired</span>;
    } else if (events.includes(CartEvents.NotProcessAble)) {
      return <span className="badge badge-warning p-1">NotProcessAble</span>;
    } else if (events.includes(CartEvents.Confirmed)) {
      return <span className="badge badge-info p-1">Confirmed</span>;
    } else if (events.includes(CartEvents.PendingConfirmation)) {
      return <span className="badge badge-warning p-1">PendingConfirmation</span>;
    } else if (events.includes(CartEvents.Created)) {
      return <span className="badge badge-info p-1">Created</span>;
    } else {
      return <></>;
    }
  };
  return (
    <>
      <PageTitle title="Recent Orders" />
      <PageLocking page="recent-orders-list-page">
        <div className="recent">
          <p>Recent Order</p>
        </div>
        <div className="table-container h-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="th-center">
                  Order Number
                </th>
                <th scope="col" className="th-center">
                  Date
                </th>
                <th scope="col" className="th-center">
                  Time
                </th>
                <th scope="col" className="th-center">
                  Customer ID
                </th>
                <th scope="col" className="th-center">
                  Items
                </th>
                <th scope="col" className="th-center">
                  Order Details
                </th>
                <th scope="col" className="th-center">
                  Total
                </th>
                <th scope="col" className="th-center">
                  Order Status
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                resentOrders.carts.map((order) => (
                  <tr key={order.id}>
                    <td scope="row">{order.id}</td>
                    <td className="th-center">
                      {order.createdAt
                        ? moment(order.createdAt).format('DD-MM-YYYY')
                        : moment().toDate().toLocaleDateString()}
                    </td>
                    <td className="th-center">
                      {order.createdAt
                        ? moment(order.createdAt).format('hh:mm')
                        : moment().toDate().toLocaleTimeString()}
                    </td>
                    <td>{order.customer?.cname}</td>
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
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading &&
            Array(pagination.limit)
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
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          limits={[25, 50, 100, 200]}
        />
      </PageLocking>
    </>
  );
}

export default RecentOrdersListPage;
