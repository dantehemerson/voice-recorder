import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import helmet from 'helmet';
import { APP_PREFIX } from './api.constants';
import { AppModule } from './app.module';
import { redocMiddleware } from './middlewares/redoc.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(APP_PREFIX);
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Voice Recorder API')
    .setDescription(
      'An API that allows you to save and retrieve voice recordings.'
    )
    .setVersion('1.0')
    .setBasePath(APP_PREFIX)
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .setContact('Dante Calderon', 'https://dantecalderon.com', '')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const SWAGGER_DOCS_PATH = APP_PREFIX + '/docs-spec';

  SwaggerModule.setup(SWAGGER_DOCS_PATH, app, document);

  const redocOptions = {
    title: 'Voice Recorder API',
    version: '1.0',
    specUrl: `${SWAGGER_DOCS_PATH}-json`, // Endpoint of OpenAPI Specification URL in JSON format
  };

  app.use(`${APP_PREFIX}/docs`, redocMiddleware(redocOptions));

  const port = process.env.PORT || 3333;

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
