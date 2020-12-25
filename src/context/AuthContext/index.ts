import AuthContext from './AuthContext';
import AuthContextProvider from './AuthContextProvider';

export default {
  Context: AuthContext,
  Provider: AuthContextProvider,
  Consumer: AuthContext.Consumer,
};
