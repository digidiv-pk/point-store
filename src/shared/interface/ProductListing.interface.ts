import { ProductInterface } from './Product.interface';

export interface ProductListingInterface {
  id: string;
  store: string;
  product: ProductInterface;
  enabled: boolean;
  qty: number;
}
