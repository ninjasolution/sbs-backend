import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserImagedDto {

    @ApiProperty({
      example: 'pejman@gmail.com',
      description: 'The email of the User',
      format: 'email',
      uniqueItems: true,
      minLength: 1,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    readonly email: string;

    @ApiProperty({
      example: 'Image change me!',
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

  }
