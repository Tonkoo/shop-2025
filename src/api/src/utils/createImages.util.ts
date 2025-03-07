import { QueryRunner } from 'typeorm';
import { Images } from '../entities/images.entity';
import { logger } from './logger/logger';
import { BadRequestException } from '@nestjs/common';

interface ImageData {
  fileName: string;
  path: string;
  mimeType: string;
}

export async function createImages(
  data: any,
  queryRunner: QueryRunner,
): Promise<number[]> {
  try {
    const images = data as unknown as ImageData[];
    return await Promise.all(
      images.map(async (image: ImageData): Promise<number> => {
        const newImage: Images = queryRunner.manager.create(Images, {
          name: image.fileName,
          path: image.path,
          type: image.mimeType,
        });
        await queryRunner.manager.save(newImage);
        return newImage.id;
      }),
    );
  } catch (err) {
    await queryRunner.rollbackTransaction();
    logger.error('Error from sections.images.create: ', err);
    throw new BadRequestException('An error occurred while adding the file.');
  }
}
