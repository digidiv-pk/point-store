import { http } from './axios';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface StoreCategoryInterface {
  id: string;
  title: string;
  friendlyTitle: string;
  description: string;
  enabled: boolean;
}

export class StoreCategory {
  static list(): AxiosPromise<StoreCategoryInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/store-category',
    };
    return http(config);
  }
}
