import React, { useContext, useEffect, useState } from 'react';
// import images from '../../assets/img';
import { AuthContext, LanguageContext } from '../../context';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';
import { API } from '../../utility';

interface State {
  active: number;
  future: number;
}

function OrderStatus(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [state, setState] = useState<State>({
    active: 0,
    future: 0,
  });
  const context: AuthContextInterface = useContext(AuthContext.Context);
  useEffect(() => {
    API.Order.futureCount()
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          future: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    const store = [];
    if (context.state.user?.store) {
      store.push(context.state.user?.store);
    }
    Promise.all([
      API.Order.filterCount({
        order: {
          store,
        },
      }),
      API.Order.filterCount({
        order: {
          store,
        },
        createdAt: {
          from: new Date(),
        },
      }),
    ])
      .then(([active, future]) => {
        setState({
          ...state,
          active: active.data.count,
        });
        console.log('active', active);
        console.log('future', future);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="row no-gutters blue-orange">
      <div className="col-6 blue">
        <div className="d-arrow">
          <span className="material-icons">keyboard_arrow_down</span>
        </div>
        <div className="row no-gutters blue-inner">
          <div className="col-6 left-blue blue-content">
            <div className="revenue">
              {languageContext.state.lang === 'en' && <p>Active Orders</p>}
              {languageContext.state.lang === 'he' && <p>הזמנות פעילות</p>}
            </div>
          </div>
          <div className="col-6 blue-content right-blue">
            <div className="numbers">
              <p>{state.active}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 orange">
        <div className="d-arrow">
          <span className="material-icons">keyboard_arrow_down</span>
        </div>
        <div className="row no-gutters blue-inner">
          <div className="col-6 left-blue blue-content">
            <div className="revenue">
              {languageContext.state.lang === 'en' && <p>Future Orders</p>}
              {languageContext.state.lang === 'he' && <p>הזמנות מתוזמנות</p>}
            </div>
          </div>
          <div className="col-6 blue-content right-blue">
            <div className="numbers">
              <p>{state.future}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
