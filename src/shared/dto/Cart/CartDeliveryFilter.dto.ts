import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { NumberRangeDTO } from '../';
import { TransportationType, CartDeliveryEvents } from '../../enum';
import { Expose, Type } from 'class-transformer';

export class CartDeliveryFilterDTO {
  @Expose()
  @IsOptional()
  @IsString()
  boy?: string[];

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  charges?: NumberRangeDTO;

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  boyEarning?: NumberRangeDTO;

  @Expose()
  @Type(() => NumberRangeDTO)
  @IsOptional()
  @ValidateNested()
  estimatedDuration?: NumberRangeDTO;

  @Expose()
  @IsOptional()
  @IsEnum(TransportationType, { each: true })
  transport?: TransportationType[];

  @Expose()
  @IsOptional()
  @IsEnum(CartDeliveryEvents, { each: true })
  eventsInclude?: CartDeliveryEvents[];

  @Expose()
  @IsOptional()
  @IsEnum(CartDeliveryEvents, { each: true })
  eventsExclude?: CartDeliveryEvents[];
}
