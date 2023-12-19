import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsNumber, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  // User id
  @ApiProperty({
    example: 'Lorem..',
    description: 'The userId of the User',
    format: 'string',
    minLength: 1,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly userId: string;

  // FirstName
  @ApiProperty({
    example: 'Lorem..',
    description: 'The name of the User',
    format: 'string',
    minLength: 1,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly firstname: string;

  // SurName
  @ApiProperty({
    example: 'Lore ipsum',
    description: 'The Surname of the User',
    format: 'string',
  })
  @IsString()
  @MaxLength(255)
  readonly surname: string;

  // Email
  @ApiProperty({
    example: 'pejman@gmail.com',
    description: 'The email of the User',
    format: 'email',
    uniqueItems: true,
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '2874596284369',
    description: 'The user rol',
    format: 'string',
  })
  readonly roles: [string];

  // Password
  @ApiProperty({
    example: 'secret password change me!',
    description: 'The password of the User',
    format: 'string'
  })
  readonly password: string;

  @ApiProperty({
    example: '2874596284369',
    description: 'The Display Name ',
    format: 'string',
  })
  @IsString()
  @MaxLength(255)
  readonly displayname: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender ',
    format: 'string',
  })
  @IsString()
  @MaxLength(255)
  readonly gender: string;
  @ApiProperty({
    example: '2874596284369',
    description: 'The phone ',
    format: 'string',
  })
  @IsString()
  @MaxLength(255)
  readonly phone: string;

  @ApiProperty({
    example: '1234',
    description: 'The postal code ',
    format: 'string',
  })
  @IsString()
  readonly postal: string;

}
