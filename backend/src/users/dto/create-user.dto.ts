import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  lastName: string;

  @ApiProperty({
    example: '123456789',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    example: '1992/05/31',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @ApiProperty({
    example: 'john@doe.com',
    required: true,
  })
  @IsEmail()
  email: string;
}
