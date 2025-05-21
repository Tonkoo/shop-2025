import { BadRequestException } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { Images } from '@entities/images.entity';
import { logger } from './logger/logger';
import { Sections } from '@entities/sections.entity';
import { Products } from '@entities/products.entity';
import { SectionDto } from '@modules/sections/dto/section.dto';
import { ProductDto } from '@modules/products/dto/product.dto';

/**
 * Удаляет указанные записи в таблице images
 * @param data
 * @param imagesRepository
 * @param queryRunner
 */
export async function removeImages(
  data: Sections | Products,
  imagesRepository: Repository<Images>,
  queryRunner: QueryRunner,
) {
  try {
    const currentImageIds: number[] | null = data.images;
    if (currentImageIds) {
      const delImages = await imagesRepository.delete(currentImageIds);
      if (!delImages) {
        throw new BadRequestException(
          'An error occurred while deleting the images.',
        );
      }
    }
  } catch (err) {
    await queryRunner.rollbackTransaction();
    logger.error('Error from removeImages : ', err);
    throw new BadRequestException('There was an error deleting images.');
  }
}

/**
 * Удаляет неиспользуемые записи в таблице images
 * @param data
 * @param currentData
 * @param imagesRepository
 * @param queryRunner
 */
export async function removeUnusedImages(
  data: SectionDto | ProductDto,
  currentData: Sections | Products,
  imagesRepository: Repository<Images>,
  queryRunner: QueryRunner,
) {
  try {
    if (data.images) {
      const newImageIds = data.images;
      const currentImageIds: number[] | null = currentData.images;
      if (currentImageIds) {
        const imagesToDelete = currentImageIds.filter(
          (id) => !newImageIds.includes(id),
        );

        if (imagesToDelete.length > 0) {
          await imagesRepository.delete(imagesToDelete);
        }
      }
    }
  } catch (err) {
    await queryRunner.rollbackTransaction();
    logger.error('Error from removeUnusedImages : ', err);
    throw new BadRequestException(
      'removeUnusedImages: There was an error deleting images.',
    );
  }
}
