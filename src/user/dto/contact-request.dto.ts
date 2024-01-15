import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactRequestDto {

    @ApiProperty({
      example: 'pejman@gmail.com',
      description: 'The email of the User',
      format: 'email',
      uniqueItems: true,
      minLength: 5,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    readonly email: string;

    @ApiProperty({
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    readonly firstName: string;

    @ApiProperty({
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    readonly companyName: string;

    @ApiProperty({
      example: 'secret new password change me!',
      description: 'The new password of the User',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    readonly message: string;

  }
