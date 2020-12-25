import { http } from './axios';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface SupportInterface {
  email: string;
  subject: string;
  phoneNumber: string;
  description: string;
  userId: string;
  storeId: string;
}

export class Support {
  static contactUs(data: SupportInterface): AxiosPromise<any> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/support',
      data,
    };
    return http(config);
  }
}
