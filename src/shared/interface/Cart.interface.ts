import { AddressDTO, GeoPointDTO } from '../dto';
import {
  CartDeliveryEvents,
  CartEvents,
  StoreOrderEvents,
  StoreReservationEvents,
  TransportationType,
} from '../enum';

export interface Customer {
  reference?: string;
  cname?: string;
  email?: string;
  phoneNumber?: string;
  address?: AddressDTO;
}

export interface StoreReservationEventInterface {
  event?: StoreReservationEvents;
  createdAt?: string;
}

interface StoreOrderEvent {
  event?: StoreOrderEvents;
  createdAt?: string;
}

interface ProductReservation {
  id?: string;
  listing?: string;
  product?: string;
  title?: string;
  quantity?: number;
  storeFacing?: number;
  totalStoreFacing?: number;
  retail?: number;
  discount?: number;
  totalRetail?: number;
  available?: boolean;
  events?: StoreReservationEventInterface[];
}

export interface SubOrder {
  store?: string;
  title?: string;
  friendlyTitle?: string;
  instruction?: string;
  address?: AddressDTO;
  reservations?: ProductReservation[];
  storeFacing?: number;
  retail?: number;
  discount?: number;
  totalRetail?: number;
  events?: StoreOrderEvent[];
}

export interface CartDeliveryEvent {
  event?: CartDeliveryEvents;
  createdAt?: string;
  riderLocation?: GeoPointDTO;
}

interface CartDelivery {
  boy?: string;
  charges?: number;
  boyEarning?: number;
  estimatedDuration?: number;
  actualDuration?: number;
  estimatedDistance?: number;
  summeryImage?: string;
  profile?: string;
  actualDistance?: number;
  transport?: TransportationType;
  events?: CartDeliveryEvent[];
}

export interface CartEvent {
  event?: CartEvents;
  createdAt?: string;
}

export interface CartInterface {
  id?: string;
  customer?: Customer;
  orders: SubOrder[];
  address?: AddressDTO;
  retail?: number;
  discount?: number;
  totalRetail?: number;
  delivery?: CartDelivery;
  city?: string;
  events?: CartEvent[];
  createdAt?: string;
}

export interface CartFilterInterface {
  carts: CartInterface[];
  count: number;
}

export interface CartSearchResult {
  count: number;
  carts: CartInterface[];
}
