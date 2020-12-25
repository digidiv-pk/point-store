import { OrderManagementTable, PageLocking, PageTitle, Pagination, SearchField } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, LanguageContext } from '../../context';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';
import { CartFilterInterface, PaginationInterface } from '../../shared/interface';
import { API } from '../../utility';

function OrdersTracking(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [pagination, setPagination] = useState<PaginationInterface>({
    limit: 25,
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<any>({});
  const [orders, setOrders] = useState<CartFilterInterface>({
    carts: [],
    count: 0,
  });
  const context: AuthContextInterface = useContext(AuthContext.Context);
  useEffect(() => {
    const store = [];
    setLoading(true);
    if (context.state.user?.store) {
      store.push(context.state.user?.store);
    }
    API.Order.filter(
      {
        ...searchFilter,
        order: {
          ...searchFilter.order,
          store,
        },
        eventsExclude: ['Completed', 'Cancled'],
      },
      {
        limit: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
      },
    )
      .then((response) => {
        setLoading(false);
        console.log(response);
        setPagination({
          ...pagination,
          pages: Math.ceil(response.data.count / pagination.limit),
        });
        setOrders(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  }, [pagination.limit, pagination.page, searchFilter]);
  return (
    <>
      <PageTitle
        title={languageContext.state.lang === 'en' ? 'Orders Management' : 'ניהול הזמנות'}
      />
      <PageLocking page="orders-tracking">
        <SearchField searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
        <OrderManagementTable orders={orders} loading={loading} count={pagination.limit} />
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

export default OrdersTracking;
