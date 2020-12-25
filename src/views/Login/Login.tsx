import React, { ChangeEvent, createRef, FormEvent, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import 'assets/scss/auth.scss';
import { Link } from 'react-router-dom';
import icons from 'assets/icons';
import { API, Validator } from 'utility';
import { ErrorsDTO, LoginRequestDTO } from 'shared/dto';
import { useRouter } from 'utility/hooks';
import { AuthContext } from '../../context';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';
import { toast } from 'react-toastify';
import { Realm } from '../../shared/enum';
import { Loading } from '../../components';

function Login(props: RouteComponentProps): JSX.Element {
  const [loginState, setLoginState] = useState<LoginRequestDTO>({
    identifier: '',
    password: '',
    realm: Realm.PointStore,
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const context = useContext<AuthContextInterface>(AuthContext.Context);
  const router = useRouter();
  const passwordRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (context.state.loggedIn) {
      if (context.state.user?.store) {
        router.history.push('/dashboard');
      } else {
        router.history.push('/register');
      }
    }
  }, [context.state.loggedIn]);

  const [loginError, setLoginError] = useState<ErrorsDTO>({});

  const loginUser = () => {
    setLoading(true);
    API.Auth.login({
      ...loginState,
    })
      .then((response) => {
        try {
          if (response.data.store) {
            API.Store.byId({ id: response.data.store as string })
              .then((storeResponse) => {
                context.action.updateUser(response.data);
                context.action.updateStore(storeResponse.data);
                context.action.setOnline(storeResponse.data.online);
                setLoading(false);
                console.log(storeResponse);
              })
              .catch((error) => {
                setLoading(false);
                console.error(error.response);
                toast.error(error.response.data.message);
              });
          } else {
            context.action.updateUser(response.data);
          }
          toast.success('Store Successfully LoggedIn');
        } catch (e) {
          console.error(e);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          console.error(error);
        }
      });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Validator.validate(LoginRequestDTO, loginState)
      .then((validate) => {
        loginUser();
      })
      .catch((errors) => {
        setLoginError(errors);
      });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setLoginState({
      ...loginState,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };
  const displayErrors = (key: string) => {
    const inputErrors = loginError[key];
    if (inputErrors) {
      if (inputErrors.length) {
        const errors = inputErrors.map((error: string, index: number) => (
          <li key={index}>{error}</li>
        ));
        return <ul>{errors}</ul>;
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
                      name="identifier"
                      onChange={onChange}
                      placeholder="Email"
                      required={true}
                      type="email"
                    />
                  </div>
                  {!!loginError.identifier && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('identifier')}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <img alt="icon" className="icon-size" src={icons.lockIcon} />
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
                          elem.type === 'password'
                            ? (elem.type = 'text')
                            : (elem.type = 'password');
                        }}>
                        <img alt="icon" src={icons.eyeIcon} />
                      </span>
                    </div>
                  </div>
                  {!!loginError.password && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('password')}
                    </small>
                  )}
                </div>
                <div className="row">
                  <div className="col-6 pd-0">
                    <div className="form-group form-check">
                      <input
                        className="form-check-input"
                        id="remember-me"
                        name="remember"
                        onChange={onChange}
                        checked={loginState.remember}
                        type="checkbox"
                      />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <Link to="/forgotPassword">Forgot password?</Link>
                  </div>
                </div>
                <div className="sign-in-btn">
                  <button className="btn" type="submit">
                    SIGN IN
                  </button>
                </div>
                <div className="new-account">
                  <Link to="/register">Don&apos;t have an account?Create</Link>
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

export default Login;
