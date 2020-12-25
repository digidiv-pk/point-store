import { IsDate, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class DateRangeDTO {
  @Expose()
  @IsOptional()
  @IsDate()
  from?: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  to?: Date;
}
