import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { ProductCategoryInterface } from '../../shared/interface';
import { http } from './axios';
import { getToken } from './getToken';

export class ProductCategory {
  static getAll(): AxiosPromise<ProductCategoryInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/product-category',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
  static byStoreCategory(params: { id: string }): AxiosPromise<ProductCategoryInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/product-category/byStoreCategory',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
}
