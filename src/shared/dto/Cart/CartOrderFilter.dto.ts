import { IsEnum, IsMongoId, IsOptional, ValidateNested } from 'class-validator';
import { NumberRangeDTO } from '../NumberRange.dto';
import { StoreOrderEvents } from '../../enum';
import { CartReservationFilterDTO } from './CartReservationFilter.dto';
import { Expose, Type } from 'class-transformer';

export class CartOrderFilterDTO {
  @Expose()
  @IsOptional()
  @IsMongoId({ each: true })
  store?: string[];

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  discount?: NumberRangeDTO;

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  storeFacing?: NumberRangeDTO;

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  retail?: NumberRangeDTO;

  @Expose()
  @Type(() => CartReservationFilterDTO)
  @IsOptional()
  @ValidateNested()
  reservation?: CartReservationFilterDTO;

  @Expose()
  @IsOptional()
  @IsEnum(StoreOrderEvents, { each: true })
  eventsInclude?: StoreOrderEvents[];

  @Expose()
  @IsOptional()
  @IsEnum(StoreOrderEvents, { each: true })
  eventsExclude?: StoreOrderEvents[];
}
