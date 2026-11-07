import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { PasswordModel } from './password.model';

@ApiSchema()
export class SignInModel extends PasswordModel {
  @ApiProperty({
    type: 'string',
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
