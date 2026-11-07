import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { FeaturesModule } from './features/features.module';
import { CredentialsModule } from './infra/credentials/credentials.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    CredentialsModule.forRoot('HS256', 'FUCK_LIFE'),
    FeaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
