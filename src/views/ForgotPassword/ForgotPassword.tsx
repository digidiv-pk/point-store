import icons from 'assets/icons';
import 'assets/scss/auth.scss';
import { isEmail } from 'class-validator';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../../components';
import { Realm } from '../../shared/enum';
import { API } from '../../utility';

interface State {
  email: string;
  errors: string[];
  loading: boolean;
}

function ForgotPassword(props: RouteComponentProps): JSX.Element {
  const [state, setState] = useState<State>({
    email: '',
    errors: [],
    loading: false,
  });

  const displayErrors = (): JSX.Element[] => {
    return state.errors.map((item) => <p key={item}>{item}</p>);
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (isEmail(state.email)) {
      setState({
        ...state,
        errors: [],
        loading: true,
      });
      API.Auth.forgetPassword({
        email: state.email,
        realm: Realm.PointStore,
      })
        .then((response) => {
          console.log(response);
          toast.success('We have send an email, check your mail box to reset password');
          setState({
            ...state,
            email: '',
            loading: false,
          });
        })
        .catch((error) => {
          toast.error('Invalid Email Address');
          setState({
            ...state,
            loading: false,
          });
          console.log(error.response);
        });
    } else {
      setState({
        ...state,
        errors: ['Email Must be an email'],
      });
    }
  };
  return (
    <div className="auth-body">
      {state.loading && <Loading />}

      <div className="sign-in ">
        <div className="card card-hw d-flex flex-column justify-content-center align-items-center">
          <div className="row no-gutters">
            <div className="col-6 d-flex flex-column justify-content-center align-items-center ">
              <div className="text left">
                <h2>Hello!</h2>
                <p>Sign in to your account</p>
              </div>
              <form className="form-body" onSubmit={onSubmit}>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <img alt="icon" className="icon-size" src={icons.messageIcon} />
                      </span>
                    </div>
                    <input
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      required={true}
                      value={state.email}
                      type="email"
                      onChange={(event) => {
                        setState({
                          ...state,
                          email: event.target.value,
                        });
                      }}
                    />
                  </div>
                  {!!state.errors.length && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors()}
                    </small>
                  )}
                </div>
                <div className="sign-in-btn">
                  <button className="btn" type="submit">
                    Reset Password
                  </button>
                </div>
                <div className="new-account">
                  <Link to="/login">Already have an account?Login</Link>
                </div>
              </form>
            </div>
            <div className="col-6 right text d-flex flex-column justify-content-center align-items-center">
              <h2>Welcome Back!</h2>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, dolore magna aliquyam </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
