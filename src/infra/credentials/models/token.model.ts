import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import type { UserEntity } from 'src/core/entities';

export class TokenModel {
  @IsString()
  @IsNotEmpty()
  @IsUUID('all')
  userId!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  exp!: number;
  iat!: number;

  toPayload() {
    return JSON.stringify({
      userId: this.userId,
      email: this.email,
    });
  }

  static fromUserEntity(user: UserEntity) {
    const model = new TokenModel();
    model.userId = user.id;
    model.email = user.email;
    return model;
  }

  static create(user: string): TokenModel;
  static create(user: TokenModel): TokenModel;
  static create(user: TokenModel | string) {
    if (typeof user === 'string') {
      const payload = JSON.parse(user) as TokenModel;
      return Object.assign(new TokenModel(), payload);
    }
    const model = new TokenModel();
    return Object.assign(model, user);
  }
}
