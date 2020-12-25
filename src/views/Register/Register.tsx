import icons from 'assets/icons';
import 'assets/scss/auth.scss';
import { AuthContext } from 'context';
import React, { ChangeEvent, createRef, FormEvent, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorsDTO, StoreRegisterStep1DTO } from 'shared/dto';
import { API, Validator } from 'utility';
import { useRouter } from 'utility/hooks';
import { Loading, StoreDetailsModal } from '../../components';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';

function Register(props: RouteComponentProps): JSX.Element {
  const [registerState, setRegisterState] = useState<Partial<StoreRegisterStep1DTO>>({});
  const [registerError, setRegisterError] = useState<ErrorsDTO>({});
  const [storeDetailModal, setStoreDetailModal] = useState<boolean>(false);
  const context = useContext<AuthContextInterface>(AuthContext.Context);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const passwordRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (context.state.loggedIn) {
      if (context.state.user?.store) {
        if (context.state.user.approved) {
          router.history.push('/dashboard');
        } else {
          context.action.logoutUser();
        }
      } else {
        setStoreDetailModal(true);
      }
    }
    console.log('context', context.state);
  }, [context.state.loggedIn]);

  const registerUser = () => {
    setLoading(true);
    API.Store.registerStep1(registerState)
      .then((response) => {
        console.log(response);
        setRegisterError({});
        context.action.updateUser(response.data);
        setLoading(false);
        toast.success('Store Registered Successfully');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        setLoading(false);
        if (error.response.status === 500) {
          toast.error('There is an error during create store');
        } else {
          toast.error(error.response.data.message.join('\n'));
        }
      });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Validator.validate(StoreRegisterStep1DTO, registerState)
      .then((validate) => {
        registerUser();
      })
      .catch((errors) => {
        console.log(errors);
        setRegisterError(errors);
      });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setRegisterState({
      ...registerState,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const displayErrors = (key: string): any => {
    const inputErrors = registerError[key];
    if (inputErrors) {
      if (inputErrors.length) {
        const errors = inputErrors.map((error: string, index: number) => (
          <li className="" key={index}>
            {error}
          </li>
        ));
        return <ul className="errors">{errors}</ul>;
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  return (
    <div className="auth-body">
      {loading && <Loading />}
      <StoreDetailsModal
        show={storeDetailModal}
        onHide={() => {
          setStoreDetailModal(false);
          context.action.logoutUser();
        }}
      />
      <div className="sign-in">
        <div className="card card-hw d-flex flex-column justify-content-center align-items-center">
          <div className="row no-gutters">
            <div className="col-6 d-flex flex-column justify-content-center align-items-center ">
              <div className="text left">
                <h2>Hello friend!</h2>
              </div>
              <form className="form-body" onSubmit={onSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <img className="icon-size" src={icons.personIcon} />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    name="firstName"
                    onChange={onChange}
                    placeholder="First Name"
                    required={true}
                    type="text"
                  />
                  {!!registerError.firstName && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('firstName')}
                    </small>
                  )}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <img className="icon-size" src={icons.personIcon} />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    name="lastName"
                    onChange={onChange}
                    placeholder="Last Name"
                    required={true}
                    type="text"
                  />
                  {!!registerError.lastName && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('lastName')}
                    </small>
                  )}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <img className="icon-size" src={icons.messageIcon} />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    name="email"
                    onChange={onChange}
                    placeholder="Email"
                    required={true}
                    type="text"
                  />

                  {!!registerError.email && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('email')}
                    </small>
                  )}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <img className="icon-size" src={icons.lockIcon} />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    name="password"
                    onChange={onChange}
                    placeholder="password"
                    required={true}
                    ref={passwordRef}
                    type="password"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        const elem = passwordRef.current as HTMLInputElement;
                        elem.type === 'password' ? (elem.type = 'text') : (elem.type = 'password');
                      }}>
                      <img src={icons.eyeIcon} />
                    </span>
                  </div>
                  {!!registerError.password && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('password')}
                    </small>
                  )}
                </div>
                <div className="row">
                  <div className="col-12 pd-0">
                    <div className="form-group form-check">
                      <input
                        className="form-check-input"
                        name="terms"
                        id="exampleCheck1"
                        type="checkbox"
                        required={true}
                        onChange={onChange}
                      />
                      <label className="form-check-label terms-condition" htmlFor="exampleCheck1">
                        <p>I have read and agree to the terms & conditions</p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sign-in-btn my-2">
                  <button className="btn btn-primary" type="submit">
                    Create Account
                  </button>
                </div>
                <div className="new-account">
                  <Link to="/login">Already have an account?Login</Link>
                </div>
              </form>
            </div>
            <div className="col-6 right text d-flex flex-column justify-content-center align-items-center">
              <h2>Welcome to PointStore</h2>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, dolore magna aliquyam </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
