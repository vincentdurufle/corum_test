import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;
}
