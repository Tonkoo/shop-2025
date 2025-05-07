import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@config/db.config';
import { SectionsModule } from '@modules/sections/sections.module';
import { ProductsModule } from '@modules/products/products.module';
import { ElasticsearchModule } from '@modules/elasticsearch/elasticsearch.module';
import { TaskModule } from '@modules/task/task.module';
import { KeycloakModule } from '@modules/keycloak/keycloak.module';

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
