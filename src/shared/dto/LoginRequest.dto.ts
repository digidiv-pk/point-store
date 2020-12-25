import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Realm } from '../enum';
import { Expose } from 'class-transformer';

export class LoginRequestDTO {
  @Expose()
  @IsEmail()
  identifier?: string;

  @Expose()
  @IsString()
  @MinLength(4)
  password?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  remember?: boolean;

  @Expose()
  @IsOptional()
  @IsEnum(Realm)
  realm?: Realm;

  constructor(partial?: Partial<LoginRequestDTO>) {
    Object.assign(this, partial);
  }
}
