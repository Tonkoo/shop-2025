import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { DataSource, Repository } from 'typeorm';

import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
    private readonly dataSource: DataSource,
    private readonly EsServices: ElasticsearchService,
  ) {}
  private readonly index: string | undefined = process.env.ELASTIC_INDEX;
}
