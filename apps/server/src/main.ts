/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  if (process.env.NODE_ENV !== 'production') {
    app.enableCors();
    const options = new DocumentBuilder()
      .setTitle('Api')
      .build();
    const document = SwaggerModule.createDocument(app, options, {});
    SwaggerModule.setup('help', app, document, {
      customCss: `.swagger-ui .scheme-container { position: sticky; top: 0; z-index: 1; margin-bottom: 0; padding: 0.25rem 0; }`,
    });
  }

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  app.use(morgan('combined'));

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().then();
