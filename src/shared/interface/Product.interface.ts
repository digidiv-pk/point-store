export interface ProductInterface {
  id: string;
  title: string;
  image?: string;
  category: string;
  description: string;
  weight: number;
  retail: number;
  storeFacing: number;
  enabled: boolean;
}
