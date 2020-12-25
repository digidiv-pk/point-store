import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import socketIOClient from 'socket.io-client';
import images from '../../assets/img';
import { AuthContext, LanguageContext } from '../../context';
import { ActiveOrdersService } from '../../services';
import { CartInterface } from '../../shared/interface';
import { API } from '../../utility';
// import CartModal from '../CartModal';
import ContactUS from '../ContactUS';
import { OrderCreateModal } from '../index';
import { IsraelFlagIcon, UnitedStateFlagIcon } from 'assets/icons';

// interface State {
//   show: boolean;
//   data?: CartInterface;
// }

// interface CartEvents {
//   data: CartInterface[];
// }

function Header(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const [contactUS, setContactUS] = React.useState(false);
  // const [state, setState] = useState<State>({
  //   show: false,
  // });
  // const [cartEvents, setCartEvents] = useState<CartEvents>({
  //   data: [],
  // });
  const [showOrderCreate, setShowOrderCreate] = useState<boolean>(false);

  // const onHide = () => {
  //   setState({
  //     data: undefined,
  //     show: false,
  //   });
  // };

  // useEffect(() => {
  //   if (state.show) {
  //     removeCartFrommCartEvents(state.data as CartInterface);
  //   } else {
  //     if (cartEvents.data.length) {
  //       const cart = cartEvents.data[0];
  //       console.log(cart);
  //     }
  //   }
  //   console.log(context.state.store);
  // }, [state]);

  // const removeCartFrommCartEvents = (cart: CartInterface) => {
  //   const index = cartEvents.data.findIndex((item) => item.id === cart.id);
  //   if (index !== -1) {
  //     setCartEvents((prevState) => {
  //       const data = [...prevState.data];
  //       data.splice(index, 1);
  //       return {
  //         data,
  //       };
  //     });
  //   }
  // };

  // const addCartToCartEvents = (cart: CartInterface) => {
  //   setCartEvents((prevState) => {
  //     return {
  //       ...prevState,
  //       data: [...prevState.data, cart],
  //     };
  //   });
  // };

  useEffect(() => {
    const activeOrdersService: ActiveOrdersService = ActiveOrdersService.getInstance();
    console.log('socketIOClient Call');
    const url = new URL(API.BASE_URL);
    url.searchParams.set('token', context.state.user?.authToken as string);
    url.searchParams.set('store', context.state.user?.store as string);
    const socket = socketIOClient(url.href);

    socket.on('connect', (data: any) => {
      console.log('socketIOClient connect', data);
    });
    socket.on('neworder', (cart: CartInterface) => {
      if (languageContext.state.lang === 'en') {
        toast.info('You have Received new Order');
      } else {
        toast.info('קיבלת הזמנה חדשה');
      }
      activeOrdersService.insertBefore(cart);
      // setState({
      //   ...state,
      //   data: cart,
      //   show: true,
      // });
      // addCartToCartEvents(cart);

      console.log('socketIOClient new_order', cart);
    });
    socket.on('disconnect', (data: any) => {
      console.error('socketIOClient disconnect', data);
    });
  }, []);

  const getDayEventText = (): string => {
    const currentHour = new Date().getHours();
    const split_afternoon = 12;
    const split_evening = 17;

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      return languageContext.state.lang === 'en' ? 'Good Afternoon' : 'אחר הצהריים טובים';
    } else if (currentHour >= split_evening) {
      return languageContext.state.lang === 'en' ? 'Good Evening' : 'ערב טוב';
    } else {
      return languageContext.state.lang === 'en' ? 'Good Morning' : 'בוקר טוב';
    }
  };

  const getText = (): JSX.Element => {
    const currentHour = new Date().getHours();
    const split_afternoon = 12;
    const split_evening = 17;

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      return (
        <span>
          {languageContext.state.lang === 'en' && <>Good Afternoon, </>}
          {languageContext.state.lang === 'he' && <>אחר הצהריים טובים, </>}
        </span>
      );
    } else if (currentHour >= split_evening) {
      return (
        <span>
          {languageContext.state.lang === 'en' && <>Good Evening, </>}
          {languageContext.state.lang === 'he' && <>ערב טוב, </>}
        </span>
      );
    } else {
      return (
        <span>
          {languageContext.state.lang === 'en' && <>Good Morning, </>}
          {languageContext.state.lang === 'he' && <>בוקר טוב, </>}
        </span>
      );
    }
  };
  return (
    <>
      <ContactUS show={contactUS} onHide={() => setContactUS(false)} />
      {/*<CartModal show={state.show} onHide={onHide} data={state.data} />*/}
      <OrderCreateModal show={showOrderCreate} onHide={() => setShowOrderCreate(false)} />
      <div className="header" />
      <div className="row mr-0 ml-0 nav-bg no-gutters ">
        <div
          className="col-2 dash-board"
          style={{
            alignItems: languageContext.state.direction === 'rtl' ? 'flex-start' : 'center',
          }}>
          {languageContext.state.lang === 'en' && <p id="page-title">Dashboard</p>}
          {languageContext.state.lang === 'he' && (
            <p id="page-title" style={{ marginRight: '10px' }}>
              לוּחַ מַחווָנִים
            </p>
          )}
        </div>

        <div className="col-10 dashboard-nav">
          <nav className="d-nav flex-items">
            <ul>
              <li>
                <p
                  className="tooltip-data welcome-message"
                  data-direction="top"
                  data-tooltip={`${getDayEventText()},  ${
                    context.state.store?.title ? context.state.store?.title : ''
                  }`}>
                  {getText()}
                  <span className="user-name">&nbsp;{context.state.store?.title}</span>
                </p>
              </li>
              <li>
                <div
                  className="Reserve"
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowOrderCreate(true)}>
                  <div className="Courier">
                    <img src={images.addButton} />
                    {languageContext.state.lang === 'en' && <p>Create Order</p>}
                    {languageContext.state.lang === 'he' && <p>צור הזמנה</p>}
                  </div>
                </div>
              </li>
              <li>
                <p className="header-item" onClick={() => setContactUS(true)}>
                  {languageContext.state.lang === 'en' && <>Contact</>}
                  {languageContext.state.lang === 'he' && <>איש קשר</>}
                </p>
              </li>
              <li>
                <Link className="header-item" to="/helpAndSupport">
                  {languageContext.state.lang === 'en' && <>Help & Support</>}
                  {languageContext.state.lang === 'he' && <>עזרה תמיכה</>}
                </Link>
              </li>
              <li>
                <Link className="header-item" to="/user-settings">
                  {languageContext.state.lang === 'en' && <>Settings</>}
                  {languageContext.state.lang === 'he' && <>הגדרות</>}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-spacer" />
          <nav
            className="d-nav"
            style={{
              paddingLeft: languageContext.state.direction === 'rtl' ? '10px' : undefined,
              paddingRight: languageContext.state.direction === 'ltr' ? '10px' : undefined,
            }}>
            <ul>
              <Dropdown as="li">
                <Dropdown.Toggle as={NavLink}>
                  <i className="fas fa-bell" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Notifications</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li">
                <Dropdown.Toggle as={NavLink}>
                  <img
                    src={(context.state.store?.image as string) || images.profileImage}
                    style={{
                      height: '35px',
                      width: '35px',
                      borderRadius: '50%',
                      border: '1px solid white',
                      objectFit: 'cover',
                      objectPosition: 'top left',
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      context.action.logoutUser();
                    }}>
                    {languageContext.state.lang === 'en' && <>Logout</>}
                    {languageContext.state.lang === 'he' && <>להתנתק</>}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as="li">
                <Dropdown.Toggle as={NavLink}>
                  {languageContext.state.lang === 'en' && (
                    <UnitedStateFlagIcon
                      style={{ width: '30px', marginRight: '5px', marginLeft: '5px' }}
                    />
                  )}
                  {languageContext.state.lang === 'he' && (
                    <IsraelFlagIcon
                      style={{ width: '30px', marginRight: '5px', marginLeft: '5px' }}
                    />
                  )}
                  {languageContext.state.lang}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.values(LanguageContext.Record).map((item) => (
                    <Dropdown.Item
                      key={item.lang}
                      onClick={() => languageContext.action.changeLanguage(item.lang)}>
                      {item.lang === 'en' && (
                        <UnitedStateFlagIcon
                          style={{ width: '30px', marginRight: '5px', marginLeft: '5px' }}
                        />
                      )}
                      {item.lang === 'he' && (
                        <IsraelFlagIcon
                          style={{ width: '30px', marginRight: '5px', marginLeft: '5px' }}
                        />
                      )}
                      {item.lang}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
