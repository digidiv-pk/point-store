import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNumber,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class GeoPointDTO {
  @Expose()
  @IsString()
  type?: 'Point';

  @Expose()
  @IsDefined()
  @IsNumber({ allowNaN: false }, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  coordinates?: number[];
}
