export enum StoreReservationEvents {
  ItemAvailable = 'ItmAvailable',
  ItemNotAvailable = 'ItemNotAvailable',
}

export enum StoreOrderEvents {
  WillDeliverOrder = 'WillDeliverOrder',
  WillNotDeliverOrder = 'WillNotDeliverOrder',
  OrderReady = 'OrderReady',
  NotResponded = 'NotResponded',
  OrderDispatched = 'OrderDispatched',
  Arrived = 'Arrived',
}
