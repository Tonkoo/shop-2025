import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { DataSource, In, Repository } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { SectionDto } from './dto/section.dto';
import { prepareData } from '../../utils/prepare.util';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { convertTimeObject } from '../../utils/convertTime.util';
import { createImages } from '../../utils/createImages.util';
import { transliterate as tr } from 'transliteration';
import {
  resultItems,
  SectionBase,
  SectionClient,
} from '../../interfaces/global';
import { camelCaseConverter } from '../../utils/toCamelCase.util';
import { Images } from '../../entities/images.entity';
import {
  removeImages,
  removeUnusedImages,
} from '../../utils/removeImages.util';
import { formatResponse } from '../../utils/formatResults.util';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
    private readonly dataSource: DataSource,
    private readonly EsServices: ElasticsearchService,
  ) {}
  private readonly index: string | undefined = process.env.ELASTIC_INDEX;

  processingData(data: SectionDto) {
    if (data.name) {
      data.code = tr(data.name.toLowerCase(), { replace: { ' ': '-' } });
    }

    if ('images' in data && !data.images) {
      data.images = [];
    }

    if (String(data.idParent) == 'null' || String(data.idParent) == '0') {
      data.idParent = null;
    }
    if (data.idParent) {
      data.idParent = Number(data.idParent);
    }
  }

  async populateSectionData(section: SectionBase) {
    if (section.images) {
      const imageIds: number[] = section.images;
      section.imageObject = await this.imagesRepository.findBy({
        id: In(imageIds),
      });
    }

    if (section.id_parent) {
      const parentSection: Sections | null = await this.sectionsRepo.findOneBy({
        id: section.id_parent,
      });
      section.parent = {
        id: 0,
        name: '',
      };
      if (parentSection) {
        section.parent = {
          id: parentSection.id,
          name: parentSection.name,
        };
      }
    }
  }

  async checkSection(data: SectionDto, section: Sections) {
    if (data.idParent) {
      const parentSection = await this.sectionsRepo.findOne({
        where: { id: data.idParent },
      });
      if (section.level - 1 != parentSection?.level) {
        throw new BadRequestException('Cannot change the section level.');
      }
    }
  }

  async create(
    data: SectionDto,
    files: { files: Express.Multer.File[] },
  ): Promise<number | resultItems> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.processingData(data);

      data.level = 1;

      if (data.idParent) {
        const parentSection = await this.sectionsRepo.findOne({
          where: { id: data.idParent },
        });
        if (!parentSection) {
          throw new NotFoundException('Section not found');
        }
        data.level = parentSection.level + 1;
      }

      const newSection: Sections = await this.sectionsRepo.save(
        prepareData(data, [
          'getItems',
          'search_name',
          'from',
          'size',
          'type',
          'parent',
          'images',
          'typeForm',
        ]),
      );

      if (!newSection) {
        throw new BadRequestException(
          'An error occurred while create the partition.',
        );
      }

      newSection.images = [];
      if (files.files) {
        data.images = await createImages(queryRunner, files);
        await this.sectionsRepo.update(
          { id: newSection.id },
          { images: data.images },
        );
        newSection.images = data.images;
      }

      await queryRunner.commitTransaction();

      const testSection = convertTimeObject(newSection) as SectionClient;

      await this.EsServices.addSectionDocument(
        this.index || 'shop',
        newSection.id.toString(),
        testSection,
        'section',
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await formatResponse(data, newSection.id, this.EsServices);
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

  async getSectionById(id: number): Promise<SectionBase[] | SectionBase> {
    try {
      const section: SectionBase | null = await this.sectionsRepo.findOneBy({
        id: id,
      });
      if (!section) {
        throw new NotFoundException('Section not found');
      }

      await this.populateSectionData(section);

      return camelCaseConverter(section);
    } catch (err) {
      console.log('Error for sections.getList: ', err);
      throw new BadRequestException(
        'An error occurred while outputting partition data.',
      );
    }
  }

  async getSectionByName(name: string): Promise<SectionBase[] | SectionBase> {
    try {
      const section: SectionBase | null = await this.sectionsRepo.findOneBy({
        name: name,
      });
      if (!section) {
        throw new NotFoundException('Section not found');
      }

      await this.populateSectionData(section);

      return camelCaseConverter(section);
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
    files: { files: Express.Multer.File[] },
  ): Promise<resultItems | number> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      {
        const currentSection: Sections | null = await this.sectionsRepo.findOne(
          {
            where: { id: id },
          },
        );

        if (!currentSection) {
          throw new NotFoundException('Section not found');
        }

        if (files.files) {
          data.images = await createImages(queryRunner, files);
        }
        this.processingData(data);

        await removeUnusedImages(
          data,
          currentSection,
          this.imagesRepository,
          queryRunner,
        );

        await this.checkSection(data, currentSection);

        const newSection = await this.sectionsRepo.update(
          { id: id },
          prepareData(data, [
            'getItems',
            'type',
            'from',
            'size',
            'searchName',
            'parent',
            'typeForm',
          ]),
        );

        if (!newSection) {
          throw new BadRequestException(
            'An error occurred while saving the partition.',
          );
        }

        const updatedSection: Sections | null = await this.sectionsRepo.findOne(
          {
            where: { id: id },
          },
        );
        if (!updatedSection) {
          throw new NotFoundException('Section not found');
        }
        await queryRunner.commitTransaction();

        await this.EsServices.updateDocument(
          this.index || 'shop',
          id.toString(),
          convertTimeObject(updatedSection),
          'section',
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return await formatResponse(data, data.id, this.EsServices);
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from sections.update : ', err);
      throw new BadRequestException(
        'An error occurred while updating the section.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async deleteById(
    id: number,
    data: SectionDto,
  ): Promise<resultItems | number> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (!id) {
        throw new NotFoundException('ID is required for deletion.');
      }

      const currentSection: Sections | null = await this.sectionsRepo.findOne({
        where: { id: id },
      });

      if (!currentSection) {
        throw new NotFoundException('Section not found');
      }

      if (
        !Array.isArray(currentSection.images) ||
        !currentSection.images.length
      ) {
        currentSection.images = null;
      }
      await removeImages(currentSection, this.imagesRepository, queryRunner);

      const delItems = await this.sectionsRepo.delete(id);

      if (!delItems) {
        throw new BadRequestException(
          'An error occurred while deleting the section.',
        );
      }

      await queryRunner.commitTransaction();

      await this.EsServices.deleteDocument(this.index || 'shop', id.toString());

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await formatResponse(data, data.id, this.EsServices);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from sections.delete : ', err);
      throw new BadRequestException(
        'An error occurred while deleting the partition.',
      );
    } finally {
      await queryRunner.release();
    }
  }
}
