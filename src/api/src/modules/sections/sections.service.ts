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
import { Images } from '../../entities/images.entity';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { convertTime } from '../../utils/convertTime.util';

interface ImageData {
  imagesName: string;
  imagesPath: string;
  imagesType: string;
}

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
    private readonly dataSource: DataSource,
    private readonly EsServices: ElasticsearchService,
  ) {}
  private readonly index = process.env.ELASTIC_INDEX;

  async createImages(data: SectionDto, queryRunner: QueryRunner) {
    try {
      const images = data.images as unknown as ImageData[];
      const imagesSection = await Promise.all(
        images.map(async (image) => {
          const newImage = queryRunner.manager.create(Images, {
            name: image.imagesName,
            path: image.imagesPath,
            type: image.imagesType,
          });
          await queryRunner.manager.save(newImage);
          return newImage.id;
        }),
      );

      data.images = imagesSection;
      return imagesSection;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from sections.images.create: ', err);
      throw new BadRequestException('An error occurred while adding the file.');
    }
  }

  async saveSection(data: SectionDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.createImages(data, queryRunner);
      return await this.create(data, queryRunner);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from sections.save: ', err);
      throw new BadRequestException(
        'An error occurred while saving the partition.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async create(data: SectionDto, queryRunner: QueryRunner) {
    try {
      const result: Sections = await this.sectionsRepo.save(
        prepareData(data, ['getSection']),
      );

      if (!result) {
        throw new BadRequestException(
          'An error occurred while create the partition.',
        );
      }
      await queryRunner.commitTransaction();
      await this.EsServices.addDocument(
        this.index || 'shop',
        result.id.toString(),
        convertTime([result])[0],
        'section',
      );

      if (data.getSection) {
        return await this.getList();
      }
      return result;
    } catch (err) {
      logger.error('Error from sections.create: ', err);
      throw new BadRequestException(
        'An error occurred while creating the section.',
      );
    }
  }

  async getList(): Promise<Sections[]> {
    try {
      const sections = await this.sectionsRepo.find();

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

  async updateById(id: number, data: SectionDto) {
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
  async deleteById(id: number, data: SectionDto) {
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
