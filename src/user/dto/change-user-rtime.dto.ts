import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserRtimeDto {

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
      example: 'secret step change me!',
      description: 'The step of the User',
      format: 'number',
      minLength: 1,
      maxLength: 2,
    })
    @IsNotEmpty()
    readonly rtime: number;

  }
