import { GeoPointDTO } from '../../shared/dto';
import { http } from './axios';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { getToken } from './getToken';

interface GeoPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}

export interface CityInterface {
  id: string;
  title: string;
  friendlyTitle: string;
  description: string;
  boundary: GeoPolygon;
  buffer: number;
  storesRadius: number;
  searchRadius: number;
  enabled: boolean;
}

export class City {
  static list(): AxiosPromise<CityInterface[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/city',
    };
    return http(config);
  }
  static byLoc(data: GeoPointDTO): AxiosPromise<CityInterface> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/city/byLoc',
      data,
      headers: {
        Authorization: getToken(),
      },
    };
    return http(config);
  }
}
