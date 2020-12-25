import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { LanguageContext } from '../../context';
import { StoreBank } from '../../shared/interface';
import { API } from '../../utility';

interface Props {
  data: StoreBank;

  onUpdate(): void;

  onHide(): void;
}

const inputNames = {
  contactPh: 'Account Holder Contact',
  contactName: 'Account Holder Name',
  title: 'Account Title',
  routing: 'SWIFT/Routing Number',
  account: 'Account Number',
  branchNumber: 'Branch Number',
  address: 'Branch Address',
  bankTitle: 'Bank Name',
};

export function UpdatePaymentDetailsDialogue(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
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
  const [errors, setErrors] = useState<StoreBank>({
    account: '',
    address: '',
    bankTitle: '',
    branchNumber: '',
    contactName: '',
    contactPh: '',
    title: '',
    routing: '',
  });

  useEffect(() => {
    setState(props.data);
  }, [props.data]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    setState({
      ...state,
      [target.name]: target.value,
    });

    if (target.value) {
      setErrors({
        ...errors,
        [target.name]: '',
      });
    } else {
      setErrors({
        ...errors,
        [target.name]: `${inputNames[target.name]} is required`,
      });
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);
    if (
      state.account &&
      state.address &&
      state.bankTitle &&
      state.branchNumber &&
      state.contactName &&
      state.contactPh &&
      state.title &&
      state.routing
    ) {
      event.preventDefault();
      API.Store.updateWallet(state)
        .then((response) => {
          if (response.data) {
            if (response.data.banks) {
              setState({
                ...state,
                ...response.data.banks,
              });
            }
          }
          toast.success('Account Update Successfully');
          props.onUpdate();
        })
        .catch((error) => {
          toast.error('Account Update Failed');
          console.error(error.response);
        });
    } else {
      const newErrors = { ...errors };
      if (!state.account) {
        newErrors.account = `${inputNames.account} is required`;
      }
      if (!state.address) {
        newErrors.address = `${inputNames.address} is required`;
      }
      if (!state.bankTitle) {
        newErrors.bankTitle = `${inputNames.bankTitle} is required`;
      }
      if (!state.branchNumber) {
        newErrors.branchNumber = `${inputNames.branchNumber} is required`;
      }
      if (!state.contactName) {
        newErrors.contactName = `${inputNames.contactName} is required`;
      }
      if (!state.contactPh) {
        newErrors.contactPh = `${inputNames.contactPh} is required`;
      }
      if (!state.title) {
        newErrors.title = `${inputNames.title} is required`;
      }
      if (!state.routing) {
        newErrors.routing = `${inputNames.routing} is required`;
      }
      setErrors(newErrors);
    }
  };
  return (
    <Modal
      onHide={props.onHide}
      size="lg"
      show={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
      backdrop="static">
      <form onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {languageContext.state.lang === 'en' && <>Bank Name</>}
                  {languageContext.state.lang === 'he' && <>שם הבנק</>}
                </label>
                <input
                  type="text"
                  id="bank-title"
                  name="bankTitle"
                  className="form-control"
                  defaultValue={state?.bankTitle}
                  onChange={onChange}
                />
                {errors.bankTitle && <small className="text-danger">{errors.bankTitle}</small>}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="bank-address">
                  {languageContext.state.lang === 'en' && <>Branch Address</>}
                  {languageContext.state.lang === 'he' && <>כתובת הסניף</>}
                </label>
                <input
                  type="text"
                  id="bank-address"
                  name="address"
                  className="form-control"
                  defaultValue={state?.address}
                  onChange={onChange}
                />
                {errors.address && <small className="text-danger">{errors.address}</small>}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {languageContext.state.lang === 'en' && <>Branch Number</>}
                  {languageContext.state.lang === 'he' && <>מספר סניף</>}
                </label>
                <input
                  type="text"
                  name="branchNumber"
                  className="form-control"
                  defaultValue={state?.branchNumber}
                  onChange={onChange}
                />
                {errors.branchNumber && (
                  <small className="text-danger">{errors.branchNumber}</small>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {languageContext.state.lang === 'en' && <>Account Number</>}
                  {languageContext.state.lang === 'he' && <>מספר חשבון</>}
                </label>
                <input
                  type="text"
                  name="account"
                  className="form-control"
                  defaultValue={state?.account}
                  onChange={onChange}
                />
                {errors.account && <small className="text-danger">{errors.account}</small>}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {languageContext.state.lang === 'en' && <>SWIFT/Routing Number</>}
                  {languageContext.state.lang === 'he' && <>מספר SWIFT / ניתוב</>}
                </label>
                <input
                  type="text"
                  name="routing"
                  className="form-control"
                  defaultValue={state?.routing}
                  onChange={onChange}
                />
                {errors.routing && <small className="text-danger">{errors.routing}</small>}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {languageContext.state.lang === 'en' && <>Account Title</>}
                  {languageContext.state.lang === 'he' && <>כותרת החשבון</>}
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  defaultValue={state?.title}
                  onChange={onChange}
                />
                {errors.routing && <small className="text-danger">{errors.title}</small>}
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {languageContext.state.lang === 'en' && <>Account Holder Name</>}
                  {languageContext.state.lang === 'he' && <>שם החשבון</>}
                </label>
                <input
                  type="text"
                  name="contactName"
                  className="form-control"
                  defaultValue={state?.contactName}
                  onChange={onChange}
                />
                {errors.contactName && <small className="text-danger">{errors.contactName}</small>}
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {languageContext.state.lang === 'en' && <>Account Holder Contact</>}
                  {languageContext.state.lang === 'he' && <>איש קשר עם בעל חשבון</>}
                </label>
                <input
                  type="text"
                  name="contactPh"
                  className="form-control"
                  defaultValue={state?.contactPh}
                  onChange={onChange}
                />
                {errors.contactPh && <small className="text-danger">{errors.contactPh}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer p-1">
          <button type="submit" className="btn btn-sm btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            data-dismiss="modal"
            onClick={props.onHide}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
