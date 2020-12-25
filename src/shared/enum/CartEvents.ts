export enum CartDeliveryEvents {
  SEARCH_INITIATED = 'search_initiated',
  BoyNotFound = 'BoyNotFound',
  ASSIGNED = 'assigned',
  RIDE_STARTED = 'ride_started',
  ArrivedAtDelivery = 'ArrivedAtDelivery',
  DELIVERED = 'delivered',
}

export enum CartEvents {
  Created = 'Created',
  Scheduled = 'Scheduled',
  Cancled = 'Cancled',
  Completed = 'Completed',
  Processing = 'Processing',
  RatedByPointCity = 'RatedByPointCity',
  RatedByPointWork = 'RatedByPointWork',
  Expired = 'Expired',
  Confirmed = 'Confirmed',
  PendingConfirmation = 'PendingConfirmation',
  NotProcessAble = 'NotProcessAble',
  Closed = 'Closed',
  Arrive = 'Arrived',
}
