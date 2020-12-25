import React, { memo, ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { AuthContext, LanguageContext } from 'context';
import { LateOrderNotificationEnum } from '../../../../shared/enum';
import { StoreInterface, UserInterface } from '../../../../shared/interface';
import { API } from '../../../../utility';
import classes from './GeneralInformation.module.scss';

interface State {
  title: string;
  name: string;
  phoneNumber: string;
  mobileNumber: string;
  address: string;
  city: string;
  zip: string;
  email: string;
  link: string;
  lateOrderNotification: LateOrderNotificationEnum;
}

function GeneralInformation(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const [state, setState] = useState<Partial<State>>({});
  useEffect(() => {
    const name: string[] = [];
    if (context.state.user?.firstName) {
      name.push(context.state.user?.firstName);
    }
    if (context.state.user?.lastName) {
      name.push(context.state.user?.lastName);
    }
    setState({
      title: context.state.store?.title,
      name: name.join(' '),
      phoneNumber: context.state.store?.phoneNumber,
      mobileNumber: context.state.store?.mobileNumber,
      address: context.state.store?.address?.locality,
      city: context.state.store?.city,
      zip: context.state.store?.zip,
      email: context.state.store?.email,
      lateOrderNotification: context.state.store?.lateOrderNotification,
      link: context.state.store?.link,
    });
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storeUpdate: Partial<StoreInterface> = {
      title: state.title,
      phoneNumber: state.phoneNumber,
      mobileNumber: state.mobileNumber,
      address: {
        locality: state.address,
        location: context.state.store?.address.location,
      },
      city: state.city,
      zip: state.zip,
      email: state.email as string,
      lateOrderNotification: state.lateOrderNotification,
      link: state.link,
    };

    const userUpdate: Partial<UserInterface> = {
      firstName: (state.name as string).split(' ').slice(0, -1).join(' '),
      lastName: (state.name as string).split(' ').slice(-1).join(' '),
    };

    Promise.all([
      API.Store.update({ id: context.state.user?.store as string }, storeUpdate),
      API.Auth.update({ id: context.state.user?.id as string }, userUpdate),
    ])
      .then(([storeResponse, userResponse]) => {
        context.action.updateStore(storeResponse.data);
        context.action.updateUser(userResponse.data);
        console.log(storeResponse);
        console.log(userResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className={clsx('col-12 p-3', classes.form)} onSubmit={onSubmit}>
      <div className="row no-gutters">
        <div className="col-12">
          <h4
            style={{
              textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
            }}>
            {languageContext.state.lang === 'en' && <>General Information</>}
            {languageContext.state.lang === 'he' && <>מידע כללי</>}
          </h4>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="b-name"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>Business Name</>}
              {languageContext.state.lang === 'he' && <>שם העסק</>}
            </label>
            <input
              type="text"
              className="form-control bordered"
              id="business-name"
              value={state.title}
              name="title"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="owner-name"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>Name of Owner</>}
              {languageContext.state.lang === 'he' && <>שם בעל הבית</>}
            </label>
            <input
              type="text"
              className="form-control bordered"
              id="owner-name"
              value={state.name}
              name="name"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="phone-number"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>Phone Number</>}
              {languageContext.state.lang === 'he' && <>מספר טלפון</>}
            </label>
            <input
              type="text"
              className="form-control bordered"
              id="phone-number"
              value={state.phoneNumber}
              name="phoneNumber"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="mobile-number"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>Mobile Number</>}
              {languageContext.state.lang === 'he' && <>מספר פלאפון</>}
            </label>
            <input
              type="text"
              className="form-control bordered"
              id="mobile-number"
              value={state.mobileNumber}
              name="mobileNumber"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="address"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>Address</>}
              {languageContext.state.lang === 'he' && <>כתובת</>}
            </label>
            <input
              type="text"
              className="form-control bordered"
              id="address"
              value={state.address}
              name="address"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="city"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>City</>}
              {languageContext.state.lang === 'he' && <>עיר</>}
            </label>
            <input
              type="text"
              className="form-control bordered"
              id="city"
              value={state.city}
              name="city"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="zip-code"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>Zip Code</>}
              {languageContext.state.lang === 'he' && <>מיקוד</>}
            </label>
            <input
              type="text"
              className="form-control bordered"
              id="link-url"
              value={state.zip}
              name="zip"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="form-group">
            <label
              htmlFor="e-mail"
              className="pl-4"
              style={{
                textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
                width: '100%',
              }}>
              {languageContext.state.lang === 'en' && <>Email</>}
              {languageContext.state.lang === 'he' && <>אימייל</>}
            </label>
            <input
              type="email"
              className="form-control bordered"
              id="e-mail"
              value={state.email}
              name="email"
              onChange={onChange}
            />
          </div>
        </div>
        <div
          className="col-3 px-2"
          style={{
            textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
            width: '100%',
          }}>
          <span
            style={{
              fontSize: '14px',
              paddingLeft: '10px',
              fontFamily: 'Rubik sans-serif',
            }}>
            {languageContext.state.lang === 'en' && <>Notification Type</>}
            {languageContext.state.lang === 'he' && <>סוג התראות</>}
          </span>
          <div className="form-check-group">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="lateOrderNotification"
                  value="sms"
                  checked={state.lateOrderNotification === 'sms'}
                  onChange={onChange}
                />
                <span className="material-icons checked">radio_button_checked</span>
                <span className="material-icons unchecked">radio_button_unchecked</span>
                <span>
                  {languageContext.state.lang === 'en' && <>SMS</>}
                  {languageContext.state.lang === 'he' && <>סמס</>}
                </span>
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="lateOrderNotification"
                  value="email"
                  checked={state.lateOrderNotification === 'email'}
                  onChange={onChange}
                />
                <span className="material-icons checked">radio_button_checked</span>
                <span className="material-icons unchecked">radio_button_unchecked</span>
                <span>
                  {languageContext.state.lang === 'en' && <>Email</>}
                  {languageContext.state.lang === 'he' && <>אימייל</>}
                </span>
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="lateOrderNotification"
                  value="phone"
                  checked={state.lateOrderNotification === 'phone'}
                  onChange={onChange}
                />
                <span className="material-icons checked">radio_button_checked</span>
                <span className="material-icons unchecked">radio_button_unchecked</span>
                <span>
                  {languageContext.state.lang === 'en' && <>Phone</>}
                  {languageContext.state.lang === 'he' && <>פלאפון</>}
                </span>
              </label>
            </div>
          </div>
        </div>
        {/*<div className="col-6 px-2">*/}
        {/*  <div className="form-group" style={{ position: 'relative' }}>*/}
        {/*    <label*/}
        {/*      htmlFor="zip-code"*/}
        {/*      style={{*/}
        {/*        position: 'absolute',*/}
        {/*        top: 0,*/}
        {/*        right: languageContext.state.direction === 'rtl' ? 0 : 'unset',*/}
        {/*        left: languageContext.state.direction === 'ltr' ? 0 : 'unset',*/}
        {/*        transform:*/}
        {/*          languageContext.state.direction === 'ltr'*/}
        {/*            ? 'translate(10px, -5px)'*/}
        {/*            : 'translate(-10px, -5px)',*/}
        {/*      }}>*/}
        {/*      {languageContext.state.lang === 'en' && <>Store Link</>}*/}
        {/*      {languageContext.state.lang === 'he' && <>קישור לחנות</>}*/}
        {/*    </label>*/}
        {/*    <input*/}
        {/*      type="url"*/}
        {/*      className="form-control bordered"*/}
        {/*      id="link-url"*/}
        {/*      value={state.link || window.location.origin + '/' + context.state.user?.store}*/}
        {/*      name="link"*/}
        {/*      onChange={onChange}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="col-3 px-2">
          <button type="submit" className="btn btn-blue px-5">
            {languageContext.state.lang === 'en' && <>Save Changes</>}
            {languageContext.state.lang === 'he' && <>שמור שינויים</>}
          </button>
        </div>
      </div>
    </form>
  );
}

export default memo(GeneralInformation);
