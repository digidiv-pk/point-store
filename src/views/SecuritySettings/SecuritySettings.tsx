import React, { useState } from 'react';
import { Loading, PageTitle } from '../../components';
import { ChangePassword, LockPage } from './components';
import { KeyLockService } from '../../services';
import { KeyLockInterface } from '../../shared/interface';
import { API } from '../../utility';
import { useObservable } from '../../utility/hooks';

interface State {
  loading: boolean;
  page: string;
  error: string;
  show: 'lock' | 'unlock' | null;
}

interface Page {
  title: string;
  page: string;
}

const pages: Page[] = [
  {
    title: 'Dashboard',
    page: 'dashboard',
  },
  {
    title: 'Order History',
    page: 'orders',
  },
  {
    title: 'Order Management',
    page: 'order-cart',
  },
  {
    title: 'Order Tracking',
    page: 'orders-tracking',
  },
  {
    title: 'Recent Orders',
    page: 'recent-orders-list-page',
  },
  {
    title: 'My CustomerAddress',
    page: 'products',
  },
];

function SecuritySettings(): JSX.Element {
  const { state } = useObservable<KeyLockInterface[]>(KeyLockService);
  const [currentPage, setCurrentPage] = useState<State>({
    loading: false,
    page: '',
    error: '',
    show: null,
  });

  const onShow = (show: 'lock' | 'unlock', page: string) => {
    setCurrentPage({
      loading: false,
      page,
      error: '',
      show,
    });
  };

  const onHide = () => {
    setCurrentPage({
      loading: false,
      page: '',
      error: '',
      show: null,
    });
  };
  const isLocked = (key: string): boolean => {
    const keys: string[] = [];
    state.forEach((item) => {
      keys.push(item.key);
    });
    return keys.includes(key);
  };
  const lockPage = (value: string) => {
    setCurrentPage({
      ...currentPage,
      loading: true,
    });
    API.Auth.keyLockCreate({ key: currentPage.page, password: value })
      .then((response) => {
        console.log(response);
        KeyLockService.getInstance()
          .getList()
          .then(() => {
            onHide();
          });
      })
      .catch((e) => {
        console.error(e.response);
        setCurrentPage({
          ...currentPage,
          error: 'Invalid Form Data',
          loading: false,
        });
      });
  };

  const unlockPage = (password: string) => {
    setCurrentPage({
      ...currentPage,
      loading: true,
    });
    API.Auth.verifyPassword({ password })
      .then((response) => {
        console.log(response);
        API.Auth.keyLockUnlock({ key: currentPage.page })
          .then((response) => {
            console.log(response);
            KeyLockService.getInstance()
              .getList()
              .then(() => {
                onHide();
              });
          })
          .catch((e) => {
            console.error(e.response);
          });
      })
      .catch((e) => {
        console.error(e.response);
        setCurrentPage({
          ...currentPage,
          error: 'Invalid User Password',
          loading: false,
        });
      });
  };

  return (
    <div className="row p-4">
      <PageTitle title="Security Settings" />

      <LockPage
        error={currentPage.error}
        inputTitle="Page Password"
        show={currentPage.show === 'lock'}
        title="Create Password"
        onSubmit={lockPage}
        onHide={onHide}>
        {currentPage.loading && <Loading />}
      </LockPage>
      <LockPage
        error={currentPage.error}
        inputTitle="User Password"
        show={currentPage.show === 'unlock'}
        title="Confirm Password"
        onSubmit={unlockPage}
        onHide={onHide}>
        {currentPage.loading && <Loading />}
      </LockPage>
      <div className="col-6">
        <div className="card text-center">
          <div
            className="card-header d-inline-flex justify-content-center align-items-center w-100"
            style={{
              backgroundColor: '#f2f2f2',
            }}>
            Pages Security
          </div>
          <div className="card-body">
            {pages.map((item) => (
              <div key={item.page} className="row">
                <div className="col-8">
                  <div className="form-group">
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control"
                      value={item.title}
                    />
                  </div>
                </div>
                <div className="col-4">
                  {isLocked(item.page) ? (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onShow('unlock', item.page)}>
                      Unlock
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => onShow('lock', item.page)}>
                      Lock
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-6">
        <ChangePassword />
      </div>
    </div>
  );
}

export default SecuritySettings;
