import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { DataSource, In, Repository } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { SectionDto, TestSectionDto } from './dto/section.dto';
import { prepareData } from '../../utils/prepare.util';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { convertTime } from '../../utils/convertTime.util';
import { createImages } from '../../utils/createImages.util';
import { transliterate as tr } from 'transliteration';
import { resultItems, SectionEntities } from '../../interfaces/global';
import { payLoad } from '../elasticsearch/dto/elasticsearch.dto';
import { camelCaseConverter } from '../../utils/toCamelCase.util';
import { Images } from '../../entities/images.entity';

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
      data.code = tr(data.name, { replace: { ' ': '-' } });
      const newSection: Sections = await this.sectionsRepo.save(
        prepareData(data, ['getSection']),
      );
      if (!newSection) {
        throw new BadRequestException(
          'An error occurred while create the partition.',
        );
      }
      if (files.files) {
        data.images = await createImages(queryRunner, files);
        await this.sectionsRepo.update(
          { id: newSection.id },
          { images: data.images },
        );
      }

      await this.EsServices.addDocument(
        this.index || 'shop',
        newSection.id.toString(),
        convertTime([newSection])[0],
        'section',
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result: Sections | resultItems[] = data.getSection
        ? await this.EsServices.getItemsFilter(searchParams)
        : newSection;
      await queryRunner.commitTransaction();
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

  async getSectionById(
    id: number,
  ): Promise<SectionEntities[] | SectionEntities> {
    try {
      const sections: SectionEntities | null =
        await this.sectionsRepo.findOneBy({
          id: id,
        });
      if (!sections) {
        throw new NotFoundException('Section not found');
      }
      console.log(sections);
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
          sections.parent = parentSection;
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

        // if (data.getSection) {
        //   return await this.getList();
        // }
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

      // if (data.getSection) {
      //   return await this.getList();
      // }

      return id;
    } catch (err) {
      logger.error('Error from sections.delete : ', err);
      throw new BadRequestException(
        'An error occurred while deleting the partition.',
      );
    }
  }
}
