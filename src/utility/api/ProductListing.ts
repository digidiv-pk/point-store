import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { AddProductInterface, ProductListingInterface } from '../../shared/interface';
import { http } from './axios';
import { getToken } from './getToken';

export class ProductListing {
  static getAll(): AxiosPromise<ProductListingInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/productlisting',

      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static byStore(params: { id: string }): AxiosPromise<ProductListingInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/productlisting/byStore',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static addProduct(data: AddProductInterface[]): AxiosPromise<ProductListingInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/productlisting',
      data: { data },
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static enable(params: {
    listing: string;
    enable: boolean;
  }): AxiosPromise<ProductListingInterface> {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: '/productlisting/enable',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }

  static addQuantity(params: {
    listing: string;
    qty: number;
  }): AxiosPromise<ProductListingInterface> {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: '/productlisting/addQuantity',
      params,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
}
