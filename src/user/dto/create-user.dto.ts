import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    // FirstName
    @ApiProperty({
      example: 'Lorem..',
      description: 'The first name of the User',
    })
    firstname: string;

    // SurName
    @ApiProperty({
      example: 'Lore ipsum',
      description: 'The Surname of the User',
    })
    surname: string;

    // Email
    @ApiProperty({
      example: 'pejman@gmail.com',
      description: 'The email of the User',
      uniqueItems: true,
      minLength: 3,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    email: string;

    // Password
    @ApiProperty({
      example: 'secret password change me!',
      description: 'The password of the User',
      minLength: 5,
      maxLength: 1024,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    password: string;

    @ApiProperty({
      example: '2874596284369',
      description: 'The Display Name ',
    })
    displayname: string;

    @ApiProperty({
      example: '2874596284369',
      description: 'The gender ',
    })
    gender: string;
  }
