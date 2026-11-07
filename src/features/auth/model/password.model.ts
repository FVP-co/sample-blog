import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { createHash } from 'crypto';

export abstract class PasswordModel {
  @ApiProperty({
    type: 'string',
    example: 'example123',
    minLength: 8,
    maxLength: 32,
    required: true,
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password!: string;

  get passwordHash(): string {
    return createHash('md5').update(this.password).digest('hex');
  }
}
