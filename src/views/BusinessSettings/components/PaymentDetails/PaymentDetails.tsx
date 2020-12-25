import icons from 'assets/icons';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { UpdatePaymentDetailsDialogue } from '../../../../components/UpdatePaymentDetailsDialogue';
import { LanguageContext } from '../../../../context';
import { StoreBank } from '../../../../shared/interface';
import { API } from '../../../../utility';
import classes from './PaymentDetails.module.scss';

function PaymentDetails(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<StoreBank>({
    account: '',
    address: '',
    bankTitle: '',
    branchNumber: '',
    contactName: '',
    contactPh: '',
    title: '',
    routing: '',
  });

  const getWallet = () => {
    API.Auth.getWallet()
      .then((response) => {
        console.log(response);
        if (response.data) {
          if (response.data.banks) {
            setState({
              ...state,
              ...response.data.banks,
            });
          }
        }
        setIsEdit(false);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <section className={classes.section}>
      {isEdit && (
        <UpdatePaymentDetailsDialogue
          data={state}
          onUpdate={getWallet}
          onHide={() => setIsEdit(false)}
        />
      )}

      <div className="card">
        <div className="card-header">
          <div className="clearfix w-100">
            <div
              className={clsx({
                'float-left': languageContext.state.direction === 'ltr',
                'float-right': languageContext.state.direction === 'rtl',
              })}>
              {languageContext.state.lang === 'en' && <>Payment Details</>}
              {languageContext.state.lang === 'he' && <>פרטי תשלום</>}
            </div>
            <div
              className={clsx({
                'float-left': languageContext.state.direction === 'rtl',
                'float-right': languageContext.state.direction === 'ltr',
              })}>
              <img
                src={icons.editIcon}
                className="edit-btn"
                alt="edit icon"
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              />
            </div>
          </div>
        </div>
        <div className="card-body p-3">
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Bank Name</>}
                {languageContext.state.lang === 'he' && <>שם הבנק</>}
              </div>
              <div className="float-right">{state?.bankTitle}</div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Branch Address</>}
                {languageContext.state.lang === 'he' && <>כתובת הסניף</>}
              </div>
              <div className="float-right">{state?.address}</div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Branch Number</>}
                {languageContext.state.lang === 'he' && <>מספר סניף</>}
              </div>
              <div className="float-right">{state?.branchNumber}</div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Account Number</>}
                {languageContext.state.lang === 'he' && <>מספר חשבון</>}
              </div>
              <div className="float-right">{state?.account}</div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>SWIFT/Routing Number</>}
                {languageContext.state.lang === 'he' && <>מספר SWIFT / ניתוב</>}
              </div>
              <div className="float-right">{state?.routing}</div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Account Title</>}
                {languageContext.state.lang === 'he' && <>כותרת החשבון</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {state?.title}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Account Holder Name</>}
                {languageContext.state.lang === 'he' && <>שם החשבון</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {state?.contactName}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Account Holder Contact</>}
                {languageContext.state.lang === 'he' && <>איש קשר עם בעל חשבון</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {state?.contactPh}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default PaymentDetails;
