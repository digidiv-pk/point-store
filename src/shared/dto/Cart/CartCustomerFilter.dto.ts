import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CartCustomerFilterDTO {
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  reference?: string[];
}
