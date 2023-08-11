import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    // FirstName
    @ApiProperty({
      example: 'Lorem..',
      description: 'The first name of the User',
      format: 'string',
    })
    readonly FirstName: string;

    // SurName
    @ApiProperty({
      example: 'Lore ipsum',
      description: 'The Surname of the User',
      format: 'string',
    })
    readonly SurName: string;

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

    // Password
    @ApiProperty({
      example: 'secret password change me!',
      description: 'The password of the User',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;

    @ApiProperty({
      example: '2874596284369',
      description: 'The Display Name ',
    })
    readonly displayName: string;

    @ApiProperty({
      example: '2874596284369',
      description: 'The gender ',
    })
    readonly gender: string;
  }
