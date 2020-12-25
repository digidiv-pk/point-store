import { CartInterface } from '../shared/interface';
import { RxJsService } from './ReactService';

export class ActiveOrdersService extends RxJsService<CartInterface[]> {
  constructor() {
    super([]);
  }
  private static _instance: ActiveOrdersService;
  public static getInstance(): ActiveOrdersService {
    if (!ActiveOrdersService._instance) {
      ActiveOrdersService._instance = new ActiveOrdersService();
    }
    return ActiveOrdersService._instance;
  }

  public insertBefore(order: CartInterface): void {
    const newOrders = [order, ...this.value];
    this.update(newOrders);
  }
}
