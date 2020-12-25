import { Expose, Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CartEvents } from '../../enum';
import { DateRangeDTO } from '../DateRange.dto';
import { NumberRangeDTO } from '../NumberRange.dto';
import { CartCustomerFilterDTO } from './CartCustomerFilter.dto';
import { CartDeliveryFilterDTO } from './CartDeliveryFilter.dto';
import { CartOrderFilterDTO } from './CartOrderFilter.dto';

export class CartSearchFilterDTO {
  @Expose()
  @IsOptional()
  @IsMongoId({ each: true })
  id?: string[];

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  city?: string[];

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  retail?: NumberRangeDTO;

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  discount?: NumberRangeDTO;

  @Expose()
  @Type(() => DateRangeDTO)
  @IsOptional()
  @ValidateNested()
  createdAt?: DateRangeDTO;

  @Expose()
  @Type(() => CartDeliveryFilterDTO)
  @IsOptional()
  @ValidateNested()
  delivery?: CartDeliveryFilterDTO;

  @Expose()
  @Type(() => CartOrderFilterDTO)
  @IsOptional()
  @ValidateNested()
  order?: CartOrderFilterDTO;

  @Expose()
  @Type(() => CartCustomerFilterDTO)
  @IsOptional()
  @ValidateNested()
  customer?: CartCustomerFilterDTO;

  @Expose()
  @IsOptional()
  @IsEnum(CartEvents, { each: true })
  eventsInclude?: CartEvents[];

  @Expose()
  @IsOptional()
  @IsEnum(CartEvents, { each: true })
  eventsExclude?: CartEvents[];
}
