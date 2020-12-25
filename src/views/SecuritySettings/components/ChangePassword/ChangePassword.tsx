import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Loading } from '../../../../components';
import { API } from '../../../../utility';

interface State {
  loading: boolean;
  values: { oldPassword: string; newPassword: string };
  errors?: any;
}

function ChangePassword(): JSX.Element {
  const [state, setState] = useState<State>({
    loading: false,
    values: {
      newPassword: '',
      oldPassword: '',
    },
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      values: {
        ...state.values,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setState({
      ...state,
      loading: true,
    });
    API.Auth.changePassword(state.values)
      .then((response) => {
        console.log(response);
        setState({
          ...state,
          values: {
            newPassword: '',
            oldPassword: '',
          },
          errors: undefined,
          loading: false,
        });
        toast.success('Password Changed Successfully');
      })
      .catch((error) => {
        console.error(error.response);
        setState({
          ...state,
          loading: false,
        });
        toast.error('Incorrect Password Details');
      });
  };
  return (
    <div className="card">
      {state.loading && <Loading />}
      <div
        className="card-header d-inline-flex justify-content-center align-items-center w-100"
        style={{
          backgroundColor: '#f2f2f2',
        }}>
        Change Password
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Old Password"
              name="oldPassword"
              id="oldPassword"
              required={true}
              value={state.values.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
              required={true}
              value={state.values.newPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
