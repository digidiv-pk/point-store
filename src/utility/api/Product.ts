import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { http } from './axios';
import { getToken } from './getToken';
import { ProductInterface } from '../../shared/interface';

export class Product {
  static getAll(): AxiosPromise<ProductInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/product',

      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
}
