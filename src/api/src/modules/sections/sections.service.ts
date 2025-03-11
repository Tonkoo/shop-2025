import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { SectionDto } from './dto/section.dto';
import { prepareData } from '../../utils/prepare.util';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { convertTime } from '../../utils/convertTime.util';
import { createImages } from '../../utils/createImages.util';
import { transliterate as tr } from 'transliteration';
import { resultItems } from '../../interfaces/global';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
    private readonly dataSource: DataSource,
    private readonly EsServices: ElasticsearchService,
  ) {}
  private readonly index: string | undefined = process.env.ELASTIC_INDEX;

  async create(
    data: SectionDto,
    files: { files: Express.Multer.File[] },
  ): Promise<Sections | resultItems[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      data.code = tr(data.name, { replace: { ' ': '-' } });
      const result: Sections = await this.sectionsRepo.save(
        prepareData(data, ['getSection']),
      );
      if (files.files) {
        data.images = await createImages(queryRunner, files);
        await this.sectionsRepo.update(
          { id: result.id },
          { images: data.images },
        );
      }

      if (!result) {
        throw new BadRequestException(
          'An error occurred while create the partition.',
        );
      }
      await this.EsServices.addDocument(
        this.index || 'shop',
        result.id.toString(),
        convertTime([result])[0],
        'section',
      );
      await queryRunner.commitTransaction();
      if (data.getSection) {
        // return await this.getList();
        // console.log(await this.EsServices.getItemsSection());
        return await this.EsServices.getItemsSection();
      }
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from sections.create: ', err);
      throw new BadRequestException(
        'An error occurred while creating the section.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getList(): Promise<Sections[]> {
    try {
      const sections: Sections[] = await this.sectionsRepo.find();

      if (!sections) {
        throw new NotFoundException('Section not found');
      }
      return sections;
    } catch (err) {
      console.log('Error for sections.getList: ', err);
      throw new BadRequestException(
        'An error occurred while outputting partition data.',
      );
    }
  }

  async updateById(
    id: number,
    data: SectionDto,
  ): Promise<Sections | Sections[]> {
    try {
      {
        const result = await this.sectionsRepo.update(
          { id: id },
          prepareData(data, ['getSection']),
        );

        if (!result) {
          throw new BadRequestException(
            'An error occurred while saving the partition.',
          );
        }

        const updatedSection: Sections | null = await this.sectionsRepo.findOne(
          {
            where: { id: id },
          },
        );

        if (updatedSection) {
          await this.EsServices.updateDocument(
            this.index || 'shop',
            id.toString(),
            convertTime([updatedSection])[0],
            'section',
          );
        } else {
          throw new NotFoundException('Section not found');
        }

        if (data.getSection) {
          return await this.getList();
        }
        return updatedSection;
      }
    } catch (err) {
      logger.error('Error from sections.update : ', err);
      throw new BadRequestException(
        'An error occurred while updating the section.',
      );
    }
  }
  async deleteById(id: number, data: SectionDto): Promise<number | Sections[]> {
    try {
      const result = await this.sectionsRepo.delete(id);

      if (!result) {
        throw new BadRequestException(
          'An error occurred while deleting the partition.',
        );
      }

      await this.EsServices.deleteDocument(this.index || 'shop', id.toString());

      if (data.getSection) {
        return await this.getList();
      }

      return id;
    } catch (err) {
      logger.error('Error from sections.delete : ', err);
      throw new BadRequestException(
        'An error occurred while deleting the partition.',
      );
    }
  }
}
