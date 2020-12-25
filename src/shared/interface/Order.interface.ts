import { TransportationType } from '../enum';
import { AddressInterface } from './Address.interface';

export interface OrderRequestItem {
  listing: string;
  quantity: number;
}

export interface OrderCreateInterface {
  listingIds: OrderRequestItem[];
  deliveryAddress: AddressInterface;
  transport: TransportationType;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  instructions: string;
}

export interface OrderEstimateRequestInterface {
  listingIds: OrderRequestItem[];
  deliveryAddress: AddressInterface;
}

interface OrderItemInterface {
  discount: number;
  listing: string;
  product: string;
  quantity: number;
  retail: number;
  title: string;
  retailTotal: number;
}

interface PerStoreInterface {
  items: OrderItemInterface[];
  id: string;
  title: string;
  friendlyTitle: string;
  storeAddress: AddressInterface;
  retailTotal: number;
}

export interface TransportInterface {
  transport: TransportationType;
  cost: number;
  distance: number;
  duration: number;
}

export interface OrderEstimateResponseInterface {
  perStore: PerStoreInterface[];
  transport: TransportInterface[];
  deliveryAddress: AddressInterface;
  retailTotal: number;
}

export interface ProductAvailability {
  product: string;
  available: boolean;
}

export interface OrderConfirmationRequest {
  listingIds: ProductAvailability[];
  cart: string;
}
