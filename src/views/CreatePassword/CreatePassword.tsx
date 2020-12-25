import icons from 'assets/icons';
import 'assets/scss/auth.scss';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading, Preloader } from '../../components';
import { LanguageContext } from '../../context';
import { ErrorsDTO } from '../../shared/dto';
import { API } from '../../utility';

interface State {
  password: string;
  confirmPassword: string;
}

function CreatePassword(props: RouteComponentProps): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [preloader, setPreloader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ErrorsDTO>({});
  useEffect(() => {
    setPreloader(true);
    API.Auth.VeryForgetPasswordToken({ token: props.match.params['token'] })
      .then((response) => {
        console.log(response);
        setPreloader(false);
      })
      .catch((error) => {
        toast.error('Invalid or Expired Link');
        props.history.push('/');
        console.log(error.response);
        setPreloader(false);
      });
  }, []);

  const displayErrors = (key: string): JSX.Element[] => {
    return errors[key].map((item) => <p key={item}>{item}</p>);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (state.password && state.confirmPassword && state.password === state.confirmPassword) {
      setLoading(true);
      API.Auth.changeForgetPassword({
        token: props.match.params['token'],
        newPassword: state.password,
      })
        .then((response) => {
          setLoading(false);
          toast.success('Password Created Successfully');
          props.history.push('/');
          console.log(response);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 406) {
            toast.error('Link is expired ');
            props.history.push('/');
          } else {
            toast.error(error.response.data.message);
          }
          console.log(error.response);
          setErrors({});
        });
    } else {
      const errorsData = { ...errors };
      if (!state.password) {
        errorsData.password = ['Must enter password to change password'];
      }
      if (!state.confirmPassword) {
        errorsData.confirmPassword = ['Must enter Confirm Password to change password'];
      }

      if (state.password !== state.confirmPassword) {
        errorsData.confirmPassword = ['Password and Confirm Password must match'];
      }

      setErrors(errorsData);
    }
  };
  return (
    <div className="auth-body">
      {preloader && <Preloader />}
      {loading && <Loading />}
      <div className="sign-in ">
        <div className="card card-hw d-flex flex-column justify-content-center align-items-center">
          <div className="row no-gutters">
            <div className="col-6 d-flex flex-column justify-content-center align-items-center ">
              <div className="text left">
                <h2>
                  {languageContext.state.lang === 'en' && <>Hello!</>}
                  {languageContext.state.lang === 'he' && <>שלום!</>}
                </h2>
                <p>
                  {languageContext.state.lang === 'en' && <>Sign in to your account</>}
                  {languageContext.state.lang === 'he' && <>תתחבר לחשבון שלך</>}
                </p>
              </div>
              <form className="form-body" onSubmit={onSubmit}>
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
                      placeholder="New Password"
                      required={true}
                      type="password"
                      value={state.password}
                      onChange={(event) => {
                        setState({
                          ...state,
                          password: event.target.value,
                        });
                      }}
                    />
                  </div>
                  {!!errors.password && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('password')}
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
                      name="confirmPassword"
                      placeholder=" Confirm password"
                      required={true}
                      type="password"
                      value={state.confirmPassword}
                      onChange={(event) => {
                        setState({
                          ...state,
                          confirmPassword: event.target.value,
                        });
                      }}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon1">
                        <img alt="icon" src={icons.eyeIcon} />
                      </span>
                    </div>
                  </div>
                  {!!errors.confirmPassword && (
                    <small className="form-text text-danger" id="emailHelp">
                      {displayErrors('confirmPassword')}
                    </small>
                  )}
                </div>
                <div className="sign-in-btn">
                  <button className="btn" type="submit">
                    {languageContext.state.lang === 'en' && <>Create Password</>}
                    {languageContext.state.lang === 'he' && <>צור סיסמה</>}
                  </button>
                </div>
                <div className="new-account">
                  <Link to="/register">
                    {languageContext.state.lang === 'en' && <>Don&apos;t have an account?Create</>}
                    {languageContext.state.lang === 'he' && <>אין לך חשבון? צור</>}
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-6 right text d-flex flex-column justify-content-center align-items-center">
              <h2>
                {languageContext.state.lang === 'en' && <>Welcome Back!</>}
                {languageContext.state.lang === 'he' && <>ברוך שובך!</>}
              </h2>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, dolore magna aliquyam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
