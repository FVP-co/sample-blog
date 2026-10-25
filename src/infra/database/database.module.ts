import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * This module is built for registering and managing database
 * @version 0.0.1-beta
 */
export class DatabaseModule {
  /**
   *
   * @description Registers database into a module globally.
   *
   * NOTE: **Don't use this in a featured module**
   *
   * @version 0.0.1-beta
   */
  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      global: true,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456',
          database: 'sample_blog_db',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    };
  }
}
