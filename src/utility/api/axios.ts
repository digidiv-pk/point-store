import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BASE_URL } from './baseURL';

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

export const http: AxiosInstance = axios.create(config);
