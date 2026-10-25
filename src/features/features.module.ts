import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { BlocksModule } from './blocks/blocks.module';

@Module({
  imports: [AuthModule, PostsModule, BlocksModule],
})
export class FeaturesModule {}
