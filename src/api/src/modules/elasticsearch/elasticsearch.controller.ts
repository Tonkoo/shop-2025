import { Controller } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('elastic')
export class Elasticsearch {
  constructor(private readonly services: ElasticsearchService) {}
}
