import { AxiosPromise, AxiosRequestConfig } from 'axios';
import {
  CartFilterInterface,
  CartInterface,
  OrderConfirmationRequest,
  OrderCreateInterface,
  OrderEstimateRequestInterface,
  OrderEstimateResponseInterface,
  PaginationParamsInterface,
} from '../../shared/interface';
import { http } from './axios';
import { getToken } from './getToken';

interface Counter {
  count: number;
}

export class Order {
  static filter(data: any, params?: PaginationParamsInterface): AxiosPromise<CartFilterInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/filter',
      data,
    };
    if (params) {
      config.params = params;
    }
    return http(config);
  }

  static filterCount(data: any, params?: PaginationParamsInterface): AxiosPromise<Counter> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/filter/count',
      data,
    };
    if (params) {
      config.params = params;
    }
    return http(config);
  }

  static byId(params: { id: string }): AxiosPromise<CartInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/byId',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static create(data: OrderCreateInterface): AxiosPromise<CartInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/store/create',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static estimate(
    data: OrderEstimateRequestInterface,
  ): AxiosPromise<OrderEstimateResponseInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/estimate',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static confirm(data: OrderConfirmationRequest): AxiosPromise<OrderEstimateResponseInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/store/confirm',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static futureCount(): AxiosPromise<{ count: number }> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/order/future/count',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static ready(data: { cartId: string }): AxiosPromise<CartInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/pointstore/ready',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static dispatch(data: { cartId: string }): AxiosPromise<CartInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/order/pointstore/dispatch',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
}
