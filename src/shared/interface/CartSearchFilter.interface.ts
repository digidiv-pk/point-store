import { CartCustomerFilterDTO, CartDeliveryFilterDTO, CartOrderFilterDTO } from '../dto';
import { CartEvents } from '../enum';
import { DateRangeInterface } from './DateRange.interface';
import { NumberRangeInterface } from './NumberRange.interface';

export interface CartSearchFilterInterface {
  id?: string[];
  city?: string[];
  retail?: NumberRangeInterface;
  discount?: NumberRangeInterface;
  createdAt?: DateRangeInterface;
  delivery?: CartDeliveryFilterDTO;
  order?: CartOrderFilterDTO;
  customer?: CartCustomerFilterDTO;
  eventsInclude?: CartEvents[];
  eventsExclude?: CartEvents[];
}
