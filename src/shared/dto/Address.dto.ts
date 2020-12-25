import { Expose, Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { GeoPointDTO } from './GeoPoint.dto';

export class AddressDTO {
  @Expose()
  @IsNotEmpty({ message: 'Address should not be empty' })
  @IsString({ message: 'Address must be a string' })
  locality?: string;

  @Expose()
  @IsDefined({ message: 'Must Select Location On Map' })
  @Type(() => GeoPointDTO)
  @ValidateNested()
  location?: GeoPointDTO;
}
