import { AddressDTO } from '../dto';
import { LateOrderNotificationEnum, Realm } from '../enum';

export interface StoreInterface {
  id: string;
  title: string;
  friendlyTitle: string;
  description: string;
  phoneNumber: string;
  mobileNumber: string;
  address: AddressDTO;
  lateOrderNotification: LateOrderNotificationEnum;
  acceptOrder: TimeRange;
  opens: TimeRange[];
  email: string;
  city: string;
  zip: string;
  category: string;
  online: boolean;
  image: string;
  link: string;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface UpdateStoreInterface {
  title: string;
  friendlyTitle: string;
  description: string;
  phoneNumber: string;
  email: string;
  lateOrderNotification: LateOrderNotificationEnum;
  acceptOrder: TimeRange;
  opens: TimeRange;
}

export interface StoreBank {
  id?: string;
  title: string;
  account: string;
  bankTitle: string;
  branchNumber: string;
  address?: string;
  contactName?: string;
  contactPh?: string;
  routing?: string;
}

export interface StoreWallet {
  id: string;
  ref: string;
  realm: Realm;
  balance: number;
  banks?: StoreBank;
  cards: [];
}
