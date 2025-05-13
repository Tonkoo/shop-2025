import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { logger } from './utils/logger/logger.js';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import KcAdminClient from '@keycloak/keycloak-admin-client';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    // TODO: env
    origin: 'http://localhost/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  const kcAdminClient = new KcAdminClient();

  // const keycloakAdmin = new KeycloakAdminClient();

  // async function getAdminAccessToken() {
  //   await kcAdminClient.auth({
  //     grantType: 'client_credentials',
  //     clientId: process.env.KEYCLOAK_CLIENT_ID || 'shop-admin-client',
  //     clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  //   });
  //
  //   return kcAdminClient.accessToken;
  // }

  await app.listen(process.env.BACKEND_PORT || 5173);
}
bootstrap();
