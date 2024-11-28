import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  lastName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @IsEmail()
  email: string;
}
