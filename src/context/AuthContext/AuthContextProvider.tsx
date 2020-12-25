import React, { Component } from 'react';
import { API, CookieData, Cookies, Storage } from 'utility';
import { StoreInterface, UserInterface } from '../../shared/interface';
import AuthContext from './AuthContext';
import { State } from './AuthContext.interface';

const state: State = {
  user: Cookies.get('currentUser'),
  store: Storage.getItem('currentStore'),
  loggedIn: Cookies.exist('currentUser'),
};

class AuthContextProvider extends Component<any, State> {
  state: State = state;

  constructor(props: any) {
    super(props);
    if (this.state.loggedIn) {
      if (this.state.user?.store) {
        if (this.state.store) {
          Promise.all([API.Auth.me(), API.Store.byId({ id: this.state.user?.store as string })])
            .then(([userResponse, storeResponse]) => {
              this.updateUser(userResponse.data);
              this.updateStore(storeResponse.data);
            })
            .catch((error) => {
              console.error(error.response);
            });
        }
      } else {
        this.logoutUser();
      }
    }
  }

  updateUser = (user: UserInterface) => {
    const userData: UserInterface = {
      ...this.state.user,
      ...user,
    };
    this.setState({
      user: userData,
      loggedIn: true,
    });
    const session = localStorage.getItem('session') === 'true';
    const expiry = new Date(localStorage.getItem('expiry') as string);
    const cookieData: CookieData<UserInterface> = {
      key: 'currentUser',
      value: userData,
      path: '/',
      expiry,
      session,
    };
    Cookies.set(cookieData);
  };

  setOnline = (online: boolean) => {
    const userData: UserInterface = {
      ...this.state.user,
      online,
    };
    this.updateUser(userData);
  };

  logoutUser = () => {
    this.setState({
      user: {},
      store: null,
      loggedIn: false,
    });
    Cookies.clear();
    Storage.clear();
  };

  updateStore = (store: StoreInterface) => {
    this.setState({
      store,
    });
    Storage.setItem('currentStore', store);
  };

  render(): JSX.Element {
    const context = {
      state: { ...this.state },
      action: {
        updateUser: this.updateUser,
        setOnline: this.setOnline,
        logoutUser: this.logoutUser,
        updateStore: this.updateStore,
      },
    };
    return <AuthContext.Provider value={context}>{this.props.children}</AuthContext.Provider>;
  }
}

export default AuthContextProvider;
