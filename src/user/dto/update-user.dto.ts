import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    // Name
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

    
    // Name
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
    readonly name: string;

    // lastName
    @ApiProperty({
      example: 'Lore ipsum',
      description: 'The last name of the User',
      format: 'string',
    })
    @IsString()
    @MaxLength(255)
    readonly lastName: string;

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
      description: 'The Id of the Retailer',
      format: 'string',
    })
    @MaxLength(255)
    readonly retailerId: string;

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
    readonly displayName: string;

    @ApiProperty({
      example: '2874596284369',
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

  }
