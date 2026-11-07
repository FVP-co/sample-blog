import { Inject, Injectable } from '@nestjs/common';
import { TokenModel } from './models/token.model';
import { sign, verify, Algorithm } from 'jsonwebtoken';

@Injectable()
export class CredentialsService {
  @Inject('JWT_CONFIG')
  private readonly jwtConfig!: { algorithm: Algorithm; key: string | Buffer };

  generateToken(token: TokenModel) {
    return sign(token.toPayload(), this.jwtConfig.key, {
      algorithm: this.jwtConfig.algorithm,
    });
  }

  validate(token: string): TokenModel {
    const response = verify(token, this.jwtConfig.key, {
      algorithms: [this.jwtConfig.algorithm],
    });
    if (typeof response === 'object') {
      throw new Error('Invalid token');
    }
    return TokenModel.create(response);
  }
}
