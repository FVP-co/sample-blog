import { DynamicModule } from '@nestjs/common';
import type { Algorithm } from 'jsonwebtoken';
import { CredentialsService } from './credentials.service';

export class CredentialsModule {
  static forRoot(algorithm: Algorithm, key: string | Buffer): DynamicModule {
    return {
      module: CredentialsModule,
      global: true,
      providers: [
        {
          provide: 'JWT_CONFIG',
          useValue: {
            algorithm: algorithm as string,
            key,
          },
        },
      ],
      exports: ['JWT_CONFIG'],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: CredentialsModule,
      providers: [CredentialsService],
      exports: [CredentialsService],
    };
  }
}
