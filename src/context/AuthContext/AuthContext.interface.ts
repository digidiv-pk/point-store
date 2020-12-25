import { StoreInterface, UserInterface } from '../../shared/interface';

export interface State {
  user?: UserInterface | null;
  store?: StoreInterface | null;
  loggedIn?: boolean;
}

interface Action {
  updateUser(user: UserInterface): void;

  updateStore(store: StoreInterface): void;

  setOnline(online: boolean): void;

  logoutUser(): void;
}

export interface AuthContextInterface {
  state: State;
  action: Action;
}
