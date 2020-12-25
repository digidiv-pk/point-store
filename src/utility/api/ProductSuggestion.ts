import { AxiosPromise, AxiosRequestConfig } from 'axios';
import {
  ProductSuggestionInterface,
  ProductSuggestionListInterface,
} from '../../shared/interface/ProductSuggestion.interface';
import { http } from './axios';
import { getToken } from './getToken';

export class ProductSuggestion {
  static suggest(data: ProductSuggestionInterface): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/product-suggestion',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
  static byStore(): AxiosPromise<ProductSuggestionListInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/product-suggestion/byStore',
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
}
