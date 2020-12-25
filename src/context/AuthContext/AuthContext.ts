import React from 'react';
import { StoreInterface, UserInterface } from '../../shared/interface';
import { AuthContextInterface } from './AuthContext.interface';

const AuthContext = React.createContext<AuthContextInterface>({
  state: {},
  action: {
    updateUser: (user: UserInterface) => {},
    setOnline: (online: boolean) => {},
    updateStore: (store: StoreInterface) => {},
    logoutUser: () => {},
  },
});
export default AuthContext;
