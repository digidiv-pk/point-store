import { AxiosPromise, AxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode';
import { StoreRegisterDTO, StoreRegisterStep1DTO, StoreRegisterStep2DTO } from 'shared/dto';
import {
  CartFilterInterface,
  CartSearchResult,
  StoreBank,
  StoreInterface,
  StoreWallet,
  UserInterface,
} from '../../shared/interface';
import { CookieData, Cookies } from '../Cookies';
import { http } from './axios';
import { getToken } from './getToken';

interface JWT {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export class Store {
  static register(data: StoreRegisterDTO): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/store/register',
      data,
    };
    return http(config);
  }

  static registerStep1(data: Partial<StoreRegisterStep1DTO>): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/store/registerStep1',
      data,
    };
    return http(config).then((response) => {
      const jwt: JWT = jwt_decode(response.data.authToken as string);
      const expiry = new Date(jwt.exp * 1000);
      localStorage.setItem('session', String(false));
      localStorage.setItem('expiry', expiry.toISOString());
      const cookieData: CookieData<UserInterface> = {
        key: 'currentUser',
        value: response.data,
        path: '/',
        expiry,
        session: false,
      };
      Cookies.set(cookieData);
      Cookies.set({
        key: 'authToken',
        value: response.data.authToken,
        path: '/',
        expiry,
        session: false,
      });
      return response;
    });
  }

  static registerStep2(data: StoreRegisterStep2DTO): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/store/registerStep2',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static recentOrders(params: {
    limit: number;
    skip: number;
    store: string | undefined;
  }): AxiosPromise<CartFilterInterface> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/store/recentOrders',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static online(params: { online: boolean; store: string }): AxiosPromise<StoreInterface> {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: '/store/online',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static byId(params: { id: string }): AxiosPromise<StoreInterface> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/store/byId',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static update(
    params: { id: string },
    data: Partial<StoreInterface>,
  ): AxiosPromise<StoreInterface> {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: '/store',
      data,
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static trackableOrders(): AxiosPromise<CartSearchResult> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/store/trackableOrders',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static addUser(data: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/store/addUser',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static users(): AxiosPromise<UserInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/store/users',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static getWallet(id: string): AxiosPromise<StoreWallet> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/store/wallet',
      params: {
        id,
      },
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static updateWallet(data: StoreBank): AxiosPromise<StoreWallet> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/auth/store/addBank',
      headers: {
        Authorization: getToken(),
      },
      data,
    };
    return http(config);
  }
}
