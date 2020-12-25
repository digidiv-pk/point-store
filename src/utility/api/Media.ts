import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { http } from './axios';

export class Media {
  static upload(data: FormData): AxiosPromise<{ path: string }> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/media/upload',
      data,
    };
    return http(config);
  }
}
