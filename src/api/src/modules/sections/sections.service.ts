import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { DataSource, In, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { SectionDto } from './dto/section.dto';
import { prepareData } from '../../utils/prepare.util';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { convertTimeObject } from '../../utils/convertTime.util';
import { createImages } from '../../utils/createImages.util';
import { transliterate as tr } from 'transliteration';
import { resultItems, SectionBase } from '../../interfaces/global';
import { payLoad } from '../elasticsearch/dto/elasticsearch.dto';
import { camelCaseConverter } from '../../utils/toCamelCase.util';
import { Images } from '../../entities/images.entity';
import { removeImages } from '../../utils/removeImages.util';
import { ProductDto } from '../products/dto/product.dto';

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

  ProcessingDate(data: SectionDto) {
    if (data.name) {
      data.code = tr(data.name, { replace: { ' ': '-' } });
    }
    if (!Array.isArray(data.images)) {
      data.images = [];
    }
  }

  async create(
    data: SectionDto,
    files: { files: Express.Multer.File[] },
  ): Promise<Sections | resultItems[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const searchParams: payLoad = {
        type: data.type,
        from: Number(data.from),
        size: Number(data.size),
        searchName: data.searchName,
      };

      this.ProcessingDate(data);

      const newSection: Sections = await this.sectionsRepo.save(
        prepareData(data, ['getSection']),
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

      await this.EsServices.addDocument(
        this.index || 'shop',
        newSection.id.toString(),
        convertTimeObject(newSection),
        'section',
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data.getSection
        ? await this.EsServices.getItemsFilter(searchParams)
        : newSection;
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
      const sections: SectionBase | null = await this.sectionsRepo.findOneBy({
        id: id,
      });
      if (!sections) {
        throw new NotFoundException('Section not found');
      }
      if (sections.images) {
        const imageIds: number[] = sections.images;
        sections.imageObject = await this.imagesRepository.findBy({
          id: In(imageIds),
        });
      }

      if (sections.id_parent) {
        const parentSection: Sections | null =
          await this.sectionsRepo.findOneBy({
            id: sections.id_parent,
          });
        if (parentSection) {
          sections.parent = {
            id: parentSection.id,
            name: parentSection.name,
          };
        }
      }

      return camelCaseConverter(sections);
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
  ): Promise<resultItems[] | UpdateResult> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      {
        const searchParams: payLoad = {
          type: data.type,
          from: Number(data.from),
          size: Number(data.size),
          searchName: data.searchName,
        };

        const currentSection: Sections | null = await this.sectionsRepo.findOne(
          {
            where: { id: id },
          },
        );

        if (!currentSection) {
          throw new NotFoundException('Section not found');
        }

        if (data.name) {
          data.code = tr(data.name, { replace: { ' ': '-' } });
        }

        if (files.files) {
          data.images = await createImages(queryRunner, files);
        }

        if (!Array.isArray(data.images)) {
          data.images = [];
        }

        const newImageIds = data.images;

        const currentImageIds: number[] | null = currentSection.images;
        if (currentImageIds) {
          const imagesToDelete = currentImageIds.filter(
            (id) => !newImageIds.includes(id),
          );

          if (imagesToDelete.length > 0) {
            await this.imagesRepository.delete(imagesToDelete);
          }
        }

        const newSection = await this.sectionsRepo.update(
          { id: id },
          prepareData(data, [
            'getSection',
            'type',
            'from',
            'size',
            'searchName',
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
        return data.getSection
          ? await this.EsServices.getItemsFilter(searchParams)
          : newSection;
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
  ): Promise<resultItems[] | number> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const searchParams: payLoad = {
      type: data.type,
      from: Number(data.from),
      size: Number(data.size),
      searchName: data.searchName,
    };
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

      const delItems = await this.sectionsRepo.delete(id);

      if (!delItems) {
        throw new BadRequestException(
          'An error occurred while deleting the section.',
        );
      }

      await removeImages(currentSection, this.imagesRepository);

      await queryRunner.commitTransaction();

      await this.EsServices.deleteDocument(this.index || 'shop', id.toString());

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data.getSection
        ? await this.EsServices.getItemsFilter(searchParams)
        : id;
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
