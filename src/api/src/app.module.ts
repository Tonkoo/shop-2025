import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/db.config.js';
import { SectionsModule } from './modules/sections/sections.module.js';
import { ProductsModule } from './modules/products/products.module.js';
import { ElasticsearchModule } from './modules/elasticsearch/elasticsearch.module.js';
import { TaskModule } from './modules/task/task.module.js';
import { KeycloakModule } from './modules/keycloak/keycloak.module.js';

@Module({
  imports: [
    SectionsModule,
    ProductsModule,
    ElasticsearchModule,
    TaskModule,
    KeycloakModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
