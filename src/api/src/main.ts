import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './utils/logger/logger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/api/v1/images/',
  });

  const config = new DocumentBuilder()
    .setTitle('Интернет-магазин')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      url: '/api-docs',
    },
  });

  await app.listen(process.env.BACKEND_PORT || 5173);
}
bootstrap();
