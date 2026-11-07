import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from 'src/core/entities';

@ApiSchema()
export class AuthModel implements UserEntity {
  constructor(user: UserEntity, token: string) {
    Object.assign(this, user);
    this.token = token;
  }

  @ApiProperty({
    type: 'string',
    readOnly: true,
  })
  @Expose()
  readonly name!: string;

  @ApiProperty({
    type: 'string',
    readOnly: true,
  })
  @Expose()
  readonly email!: string;

  @Exclude()
  readonly password!: string;

  @ApiProperty({
    type: 'string',
    readOnly: true,
  })
  @Expose()
  readonly age!: number;

  @ApiProperty({
    type: 'string',
    readOnly: true,
  })
  @Expose()
  readonly id!: string;

  @ApiProperty({
    type: 'string',
    readOnly: true,
  })
  @Expose()
  readonly createdAt!: Date;

  @ApiProperty({
    type: 'string',
    readOnly: true,
  })
  @Expose()
  readonly updatedAt!: Date;

  @ApiProperty({
    type: 'string',
    readOnly: true,
  })
  @Expose()
  readonly deletedAt!: Date;

  @ApiProperty({
    type: 'string',
    description: 'The token to authenticate the user',
    example: '1234567890',
    readOnly: true,
  })
  @Expose()
  readonly token!: string;
}
