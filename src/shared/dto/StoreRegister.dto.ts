import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
  // Validate,
  ValidateNested,
} from 'class-validator';
// import { ValidatePhoneNumber } from '../../utility/Validator';
import { AddressDTO } from './Address.dto';
import { Expose, Type } from 'class-transformer';

export class StoreRegisterDTO {
  @Expose()
  @IsString()
  title?: string;

  @Expose()
  @IsOptional()
  @IsString()
  friendlyTitle?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Expose()
  @Type(() => AddressDTO)
  @ValidateNested()
  address?: AddressDTO;

  @Expose()
  @IsEmail()
  email?: string;

  @Expose()
  @IsString()
  @MinLength(6)
  password?: string;

  @Expose()
  @IsString()
  city?: string;

  @Expose()
  @IsString()
  category?: string;

  constructor(partial?: Partial<StoreRegisterDTO>) {
    Object.assign(this, partial);
  }
}

export class StoreRegisterStep1DTO {
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  terms: boolean;
}

export class StoreRegisterStep2DTO {
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  friendlyTitle: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  // @Validate(ValidatePhoneNumber)
  @IsPhoneNumber(null)
  phoneNumber: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @Type(() => AddressDTO)
  @IsDefined()
  @ValidateNested({ always: true })
  address?: AddressDTO;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  category: string;
}
