import React, { useContext, useEffect, useState } from 'react';
import icons from '../../../../assets/icons';
import { Loading } from '../../../../components';
import { LanguageContext } from '../../../../context';
import { KeyLockService } from '../../../../services';
import { KeyLockInterface } from '../../../../shared/interface';
import { API } from '../../../../utility';
import { useObservable } from '../../../../utility/hooks';
import { LockPage } from './components';
import classes from './SecuritySettings.module.scss';

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

function SecuritySettings(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const { state } = useObservable<KeyLockInterface[]>(KeyLockService);
  const [pages, setPages] = useState<Page[]>([
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
      title: 'My Customer Address',
      page: 'products',
    },
  ]);

  useEffect(() => {
    setPages([
      {
        title: languageContext.state.lang === 'en' ? 'Dashboard' : 'לוח בקרה',
        page: 'dashboard',
      },
      {
        title: languageContext.state.lang === 'en' ? 'Order History' : 'הסטוריית הזמנות',
        page: 'orders',
      },
      {
        title: languageContext.state.lang === 'en' ? 'Order Management' : 'הסטוריית הזמנות',
        page: 'order-cart',
      },
      {
        title: languageContext.state.lang === 'en' ? 'Order Tracking' : 'מעקב אחר הזמנה',
        page: 'orders-tracking',
      },
      {
        title: languageContext.state.lang === 'en' ? 'Recent Orders' : 'הזמנות אחרונות',
        page: 'recent-orders-list-page',
      },
      {
        title: languageContext.state.lang === 'en' ? 'Products' : 'מוצרים',
        page: 'products',
      },
    ]);
  }, [languageContext]);
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
          .then((keyLockUnlockResponse) => {
            console.log(keyLockUnlockResponse);
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
    <section className={classes.section}>
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
      <h4>
        {languageContext.state.lang === 'en' && <>Security Settings:</>}
        {languageContext.state.lang === 'he' && <>החטבאתורדגה</>}
      </h4>
      <form>
        {pages.map((item) => (
          <section key={item.page}>
            <div className="form-group m-0">
              <input
                type="text"
                value={item.title}
                readOnly={true}
                className="form-control bordered"
              />
            </div>
            <div className="form-check form-toggle">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  checked={isLocked(item.page)}
                  onChange={(event) => onShow(event.target.checked ? 'lock' : 'unlock', item.page)}
                  type="checkbox"
                  value=""
                />
                <img src={icons.toggleOn} className="toggle-on" alt="toggle-on" />
                <img src={icons.toggleOff} className="toggle-off" alt="toggle-off" />
              </label>
            </div>
          </section>
        ))}
      </form>
    </section>
  );
}

export default SecuritySettings;
