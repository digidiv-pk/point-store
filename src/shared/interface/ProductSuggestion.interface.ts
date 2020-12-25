import { ProductSuggestionEnum } from '../enum';

export interface ProductSuggestionInterface {
  title: string;
  description: string;
  image: string;
  category: string;
  weight: number;
  retail: number;
}

export interface ProductSuggestionListInterface {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status: ProductSuggestionEnum;
  weight: number;
  retail: number;
}
