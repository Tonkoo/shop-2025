import { Module } from '@nestjs/common';
import { ElasticsearchModule as ESModule } from '@nestjs/elasticsearch';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticController } from './elasticsearch.controller';

@Module({
  imports: [
    ESModule.registerAsync({
      useFactory: () => ({
        node: process.env.ELASTIC_URL || 'http://localhost:9200',
        auth: {
          username: process.env.ELASTIC_USER || 'elastic',
          password: process.env.ELASTIC_PASSWORD || 'elastic',
        },
      }),
    }),
  ],
  controllers: [ElasticController],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
