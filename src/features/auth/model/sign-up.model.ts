import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { PasswordModel } from './password.model';

@ApiSchema()
export class SignUpModel extends PasswordModel {
  @ApiProperty({
    type: 'string',
    example: 'example@gmail.com',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    maxLength: 64,
    required: true,
    description: 'The name of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name!: string;

  @Max(120)
  @Min(5)
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    type: 'integer',
    example: 20,
    minimum: 5,
    maximum: 120,
    required: true,
    description: 'The age of the user',
  })
  age!: number;
}
