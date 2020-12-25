import React, { ChangeEvent, useContext, useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/img';
import { AuthContext, LanguageContext } from '../../context';
import { API } from '../../utility';
import ContactUS from '../ContactUS';

interface State {
  online: boolean;
}
function SideNav(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const [contactUS, setContactUS] = React.useState(false);
  const [state, setState] = useState<State>({
    online: false,
  });
  useEffect(() => {
    setState({
      online: context.state.store?.online as boolean,
    });
  }, [context]);

  const changeOnlineStatus = (event: ChangeEvent<HTMLInputElement>) => {
    API.Store.online({ online: event.target.checked, store: context.state.user?.store as string })
      .then((response) => {
        setState({
          ...state,
          online: response.data.online,
        });
        context.action.updateStore(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const onClickParent = (event: MouseEvent<HTMLDivElement>): void => {
    event.persist();
    const parent = event.currentTarget;
    const nextSibling: HTMLUListElement = parent.nextSibling as HTMLUListElement;
    if (!nextSibling.hidden) {
      nextSibling.hidden = true;
      if (parent.querySelector('img:last-child')) {
        (parent.querySelector('img:last-child') as HTMLImageElement).style.transform =
          'rotate(180deg)';
      }
    } else {
      nextSibling.hidden = false;
      if (parent.querySelector('img:last-child')) {
        (parent.querySelector('img:last-child') as HTMLImageElement).style.transform = 'unset';
      }
    }
  };
  return (
    <>
      <ContactUS show={contactUS} onHide={() => setContactUS(false)} />
      <div className="logo">
        <img src={images.pointStoreLogo} />
      </div>
      <div className="toogle d-flex">
        <div className="main-toggle pr-0">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitches"
              checked={state.online}
              onChange={changeOnlineStatus}
            />
            <label className="custom-control-label active" htmlFor="customSwitches">
              {languageContext.state.lang === 'en' && <>Active</>}
              {languageContext.state.lang === 'he' && <>פָּעִיל</>}
            </label>
          </div>
        </div>
        <div className=" main-vl">
          <div className="vl" />
        </div>
        <div
          className="main-b-id pr-0 tooltip-data"
          data-direction="top"
          data-tooltip={`Business ID: ${context.state.user?.id}`}>
          <p className="B-id">
            {languageContext.state.lang === 'en' && <>Business ID: </>}
            {languageContext.state.lang === 'he' && <>קוד עסק : </>}
            {context.state.user?.id}
          </p>
        </div>
      </div>

      <div className="dashboard-heading">
        <p className="p-0 m-0 my-2">
          <Link
            to="/dashboard"
            style={{
              color: '#ff931e',
            }}>
            {languageContext.state.lang === 'en' && <>Dashboard</>}
            {languageContext.state.lang === 'he' && <>לוח בקרה</>}
          </Link>
        </p>
      </div>
      <nav className="sidenav">
        <ul>
          <li>
            <div style={{ cursor: 'pointer' }} onClick={onClickParent}>
              <img src={images.orderIcon} />

              <span>
                {languageContext.state.lang === 'en' && <>Orders</>}
                {languageContext.state.lang === 'he' && <>הזמנות</>}
              </span>
              <img src={images.downArrow} />
            </div>
            <ul>
              <li>
                <Link to="/orders">
                  {languageContext.state.lang === 'en' && <>Order History</>}
                  {languageContext.state.lang === 'he' && <>הסטוריית הזמנות</>}
                </Link>
              </li>
              <li>
                <Link to="/orders-tracking">
                  {languageContext.state.lang === 'en' && <>Order Management</>}
                  {languageContext.state.lang === 'he' && <>ניהול הזמנות</>}
                </Link>
              </li>
              {/*<li>*/}
              {/*  <Link to="/orders-tracking">Order Tracking</Link>*/}
              {/*</li>*/}
            </ul>
          </li>
          <li>
            <div style={{ cursor: 'pointer' }} onClick={onClickParent}>
              <img src={images.storeaIcon} />
              <span>
                {languageContext.state.lang === 'en' && <>My store</>}
                {languageContext.state.lang === 'he' && <>החנות שלי</>}
              </span>
              <img src={images.downArrow} />
            </div>
            <ul>
              <li>
                <Link to="/products-list">
                  {languageContext.state.lang === 'en' && <>Products</>}
                  {languageContext.state.lang === 'he' && <>מוצרים</>}
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <div style={{ cursor: 'pointer' }} onClick={onClickParent}>
              <img src={images.walletIcon} />
              <span>
                {languageContext.state.lang === 'en' && <>Wallet & Reports</>}
                {languageContext.state.lang === 'he' && <>ארנק ודוחות</>}
              </span>
              <img src={images.downArrow} />
            </div>
            <ul>
              <li>
                <Link to="/wallet">
                  {languageContext.state.lang === 'en' && <>Wallet</>}
                  {languageContext.state.lang === 'he' && <>ארנק</>}
                </Link>
              </li>
              <li>
                <Link to="/secondwallet">
                  {languageContext.state.lang === 'en' && <>Wallet Setting</>}
                  {languageContext.state.lang === 'he' && <>הגדרת ארנק</>}
                </Link>
              </li>
              <li>
                <Link to="/reports">
                  {languageContext.state.lang === 'en' && <>Reports</>}
                  {languageContext.state.lang === 'he' && <>דוחות</>}
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <div style={{ cursor: 'pointer' }} onClick={onClickParent}>
              <img src={images.settingIcon} />
              <span>
                {languageContext.state.lang === 'en' && <>Account Settings</>}
                {languageContext.state.lang === 'he' && <>הגדרות חשבון</>}
              </span>
              <img src={images.downArrow} />
            </div>
            <ul>
              {/*<li>*/}
              {/*  <Link to="/modals">Modal</Link>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*  <Link to="/general-settings">Basic Settings</Link>*/}
              {/*</li>*/}
              <li>
                <Link to="/business-settings">
                  {languageContext.state.lang === 'en' && <>Business Settings</>}
                  {languageContext.state.lang === 'he' && <>הגדרות עסק</>}
                </Link>
              </li>
              <li>
                <Link to="/user-settings">
                  {languageContext.state.lang === 'en' && <>Security Settings</>}
                  {languageContext.state.lang === 'he' && <>הגדרות אבטחה</>}
                </Link>
              </li>
              <li>
                <a href="javascript:void(0)">
                  {languageContext.state.lang === 'en' && <>Promotions</>}
                  {languageContext.state.lang === 'he' && <>מבצעים</>}
                </a>
              </li>
            </ul>
          </li>

          <li>
            <div style={{ cursor: 'pointer' }} onClick={onClickParent}>
              <img src={images.supportIcon} />
              <span>
                {languageContext.state.lang === 'en' && <>Support</>}
                {languageContext.state.lang === 'he' && <>תמיכה</>}
              </span>
              <img src={images.downArrow} />
            </div>
            <ul>
              <li>
                <Link to="/helpAndSupport">
                  {languageContext.state.lang === 'en' && <>Questions & Answers</>}
                  {languageContext.state.lang === 'he' && <>שאלות ותשובות</>}
                </Link>
              </li>
              <li>
                <span onClick={() => setContactUS(true)}>
                  {languageContext.state.lang === 'en' && <>Contact</>}
                  {languageContext.state.lang === 'he' && <>צור קשר</>}
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideNav;
