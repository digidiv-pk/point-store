import { AxiosPromise, AxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode';
import { LoginRequestDTO } from 'shared/dto';
import { Realm } from '../../shared/enum';
import { KeyLockInterface, StoreWallet, UserInterface } from '../../shared/interface';
import { CookieData, Cookies } from '../Cookies';
import { http } from './axios';
import { getToken } from './getToken';

interface JWT {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export class Auth {
  static login(data: LoginRequestDTO): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/auth/login',
      data,
    };
    return http(config).then((response) => {
      const jwt: JWT = jwt_decode(response.data.authToken as string);
      const expiry = new Date(jwt.exp * 1000);
      localStorage.setItem('session', String(!data.remember));
      localStorage.setItem('expiry', expiry.toISOString());
      const cookieData: CookieData<UserInterface> = {
        key: 'currentUser',
        value: response.data,
        path: '/',
        expiry,
        session: !data.remember,
      };
      Cookies.set(cookieData);
      Cookies.set({
        key: 'authToken',
        value: response.data.authToken,
        path: '/',
        expiry,
        session: !data.remember,
      });
      return response;
    });
  }

  static forgetPassword(data: { email: string; realm: Realm.PointStore }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/auth/forgetPassword',
      data,
    };
    return http(config);
  }

  static changePassword(data: { oldPassword: string; newPassword: string }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/auth/changePassword',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static VeryForgetPasswordToken(params: { token: string }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/auth/VeryForgetPasswordToken',
      params,
    };
    return http(config);
  }

  static changeForgetPassword(data: { token: string; newPassword: string }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/auth/ChangeForgetPassword',
      data,
    };
    return http(config);
  }

  static verifyPassword(params: { password: string }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/auth/me/verifyPassword',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static keyLockVerify(params: { key: string; password: string }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/auth/keylock/verify',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static keyLockUnlock(params: { key: string }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: '/auth/keylock/unlock',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static keyLockList(): AxiosPromise<KeyLockInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/auth/keylock/list',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static keyLockCreate(params: { key: string; password: string }): AxiosPromise<KeyLockInterface> {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: '/auth/keylock/create',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static keyLockUpdate(params: { key: string; password: string }): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: '/auth/keylock',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static update(params: { id: string }, data: Partial<UserInterface>): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: '/auth/updateUser',
      params,
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static me(): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/auth/me',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static getWallet(): AxiosPromise<StoreWallet> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/auth/wallet',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static delete(id: string): AxiosPromise<UserInterface> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: '/auth',
      params: {
        id,
      },
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
}
