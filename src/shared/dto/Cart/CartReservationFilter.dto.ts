import { IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { NumberRangeDTO } from '../NumberRange.dto';
import { StoreReservationEvents } from '../../enum';
import { Expose, Type } from 'class-transformer';

export class CartReservationFilterDTO {
  @Expose()
  @IsOptional()
  @IsMongoId({ each: true })
  id?: string[];

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  listing?: string[];

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  product?: string[];

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  quantity?: NumberRangeDTO;

  @Expose()
  @IsOptional()
  @IsEnum(StoreReservationEvents, { each: true })
  eventsInclude?: StoreReservationEvents[];

  @Expose()
  @IsOptional()
  @IsEnum(StoreReservationEvents, { each: true })
  eventsExclude?: StoreReservationEvents[];
}
