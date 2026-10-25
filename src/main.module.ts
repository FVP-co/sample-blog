import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [DatabaseModule.forRoot(), FeaturesModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
