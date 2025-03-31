import { BadRequestException } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { Images } from '../entities/images.entity';
import { logger } from './logger/logger';
import { Sections } from '../entities/sections.entity';
import { Products } from '../entities/products.entity';

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
