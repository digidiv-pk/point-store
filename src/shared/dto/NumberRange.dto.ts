import { IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class NumberRangeDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  min?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  max?: number;
}
