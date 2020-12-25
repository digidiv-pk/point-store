import { isEmail, isPhoneNumber, isString } from 'class-validator';
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface Customer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface Props {
  next(customer: Customer): void;

  back(): void;
}

function CustomerInfo(props: Props): JSX.Element {
  const [state, setState] = useState<Customer>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });
  const [errors, setErrors] = useState<Customer>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      isString(state.firstName) &&
      isString(state.lastName) &&
      isPhoneNumber(state.phoneNumber, null)
    ) {
      props.next(state);
    } else {
      setErrors((data) => {
        const newErrors = { ...data };
        if (!isString(state.firstName)) {
          newErrors.firstName = 'Must Enter First Name';
        }
        if (!isString(state.lastName)) {
          newErrors.lastName = 'Must Enter Last Name';
        }
        if (!isPhoneNumber(state.phoneNumber, null)) {
          newErrors.phoneNumber = 'Phone Number Must Be Valid';
        }
        if (!isEmail(state.email)) {
          newErrors.phoneNumber = 'Email Must Be Valid';
        }
        return newErrors;
      });
    }
  };
  return (
    <>
      <div className="dialog-title">Customer’s Information</div>
      <div className="dialog-desc">
        Please enter customer’s contact information for order updates
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-3 pr-1">
            <input
              className="dialog-input"
              placeholder="First Name"
              type="text"
              required={true}
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
            />
            {!!errors.firstName && (
              <small className="form-text text-danger">{errors.firstName}</small>
            )}
          </div>
          <div className="col-3 pr-1">
            <input
              className="dialog-input"
              placeholder="Last Name"
              type="text"
              required={true}
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
            />
            {!!errors.lastName && (
              <small className="form-text text-danger">{errors.lastName}</small>
            )}
          </div>
          <div className="col-3 pr-1">
            <input
              className="dialog-input"
              placeholder="email"
              type="email"
              required={true}
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            {!!errors.email && <small className="form-text text-danger">{errors.email}</small>}
          </div>
          <div className="col-3 pl-1">
            <input
              className="dialog-input"
              placeholder="Mobile Phone Number"
              type="tel"
              required={true}
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={handleChange}
              onKeyDown={(event) => {
                if (
                  event.key.length === 1 &&
                  !event.ctrlKey &&
                  !event.altKey &&
                  !event.shiftKey &&
                  !event.shiftKey &&
                  !(event.key.charCodeAt(0) >= 48 && event.key.charCodeAt(0) <= 57)
                ) {
                  event.preventDefault();
                } else if (event.key.charCodeAt(0) === 43) {
                  if (event.currentTarget.value.length !== 0) {
                    event.preventDefault();
                  }
                }
              }}
            />

            {!!errors.phoneNumber && (
              <small className="form-text text-danger">{errors.phoneNumber}</small>
            )}
          </div>
        </div>
        <div className="clearfix">
          <button
            className="btn dialog-button float-left"
            type="button"
            onClick={() => props.back()}>
            Back
          </button>
          <button className="btn dialog-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
}

export default CustomerInfo;
