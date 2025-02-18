import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { SectionDto } from './dto/section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
  ) {}
  async create(data: CreateSectionDto) {
    const section = new Sections();
    section.code = data.code;
    section.name = data.name;
    section.images = data.images;
    section.id_parent = data.id_parent;

    const res = await section.save();

    return section;

    return new SectionDto(res);
  }
}
