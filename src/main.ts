import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger, INestApplication, Logger } from '@nestjs/common';

function configureSwagger(
  app: INestApplication<any>,
  packageName?: string,
  packageVersion?: string,
  packageDescription?: string,
) {
  const config = new DocumentBuilder()
    .setTitle(`${packageName} API`)
    .setDescription(packageDescription ?? '')
    .setVersion(packageVersion ?? '')
    .addServer('http://localhost:3000', 'Local')
    .addServer('https://api.sample-blog.com', 'Production')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
}

function configureLogger(packageName: string, version: string) {
  const logger = new ConsoleLogger({
    prefix: `${packageName} ${version}`,
  });
  Logger.overrideLogger(logger);
  return logger;
}

async function bootstrap() {
  const PACKAGE_NAME = process.env.npm_package_name || 'nest';
  const PACKAGE_VERSION = process.env.npm_package_version || '0.0.0';
  const PACKAGE_DESCRIPTION = process.env.npm_package_description || '';
  const logger = configureLogger(PACKAGE_NAME, PACKAGE_VERSION);
  const app = await NestFactory.create(MainModule, {
    logger: logger,
  });
  app.enableCors();
  configureSwagger(app, PACKAGE_NAME, PACKAGE_VERSION, PACKAGE_DESCRIPTION);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
