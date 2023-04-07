import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
