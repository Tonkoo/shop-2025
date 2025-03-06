import { SectionDto } from '../modules/sections/dto/section.dto';
import { QueryRunner } from 'typeorm';
import { Images } from '../entities/images.entity';
import { logger } from './logger/logger';
import { BadRequestException } from '@nestjs/common';
import { ProductDto } from '../modules/products/dto/product.dto';

interface ImageData {
  imagesName: string;
  imagesPath: string;
  imagesType: string;
}

export async function createImages(
  data: SectionDto | ProductDto,
  queryRunner: QueryRunner,
): Promise<number[]> {
  try {
    const images = data.images as unknown as ImageData[];
    const imagesBlock: number[] = await Promise.all(
      images.map(async (image: ImageData): Promise<number> => {
        const newImage: Images = queryRunner.manager.create(Images, {
          name: image.imagesName,
          path: image.imagesPath,
          type: image.imagesType,
        });
        await queryRunner.manager.save(newImage);
        return newImage.id;
      }),
    );

    data.images = imagesBlock;
    return imagesBlock;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    logger.error('Error from sections.images.create: ', err);
    throw new BadRequestException('An error occurred while adding the file.');
  }
}
