import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    // Name
    @ApiProperty({
      example: 'Lorem..',
      description: 'The name of the User',
      format: 'string',
    })
    readonly name: string;

    // lastName
    @ApiProperty({
      example: 'Lore ipsum',
      description: 'The last name of the User',
      format: 'string',
    })
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

     // image
     @ApiProperty({
      example: 'Lore ipsum',
      description: 'The image of the User',
      format: 'string',
    })
    @IsString()
    readonly image: string;

    @ApiProperty({
      example: 'imageKey change me!',
      description: 'The imageKey of the User',
      format: 'string',
    })
    @IsString()
    readonly imageKey: string;

    @ApiProperty({
      example: '2874596284369',
      description: 'The Id of the Retailer',
      format: 'string',
    })
    @IsString()
    @MaxLength(255)
    readonly retailerId: string;

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

    @ApiProperty({
      example: '2874596284369',
      description: 'The phone ',
    })
    readonly phone: string;
  }
