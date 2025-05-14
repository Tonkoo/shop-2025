import { QueryRunner } from 'typeorm';
import { Images } from './../entities/images.entity.js';
import { logger } from './logger/logger.js';
import { BadRequestException } from '@nestjs/common';
import { renameSync } from 'fs';
import { join, dirname } from 'path';

interface ImageData {
  fileName: string;
  path: string;
  mimeType: string;
}

/**
 * Создает запись в таблице images
 * @param queryRunner
 * @param files
 */

export async function createImages(
  queryRunner: QueryRunner,
  files: { files: Express.Multer.File[] },
): Promise<number[]> {
  try {
    const images: ImageData[] = files.files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      mimeType: file.mimetype,
    }));
    return await Promise.all(
      images.map(async (image: ImageData): Promise<number> => {
        const existingImage = await queryRunner.manager.findOne(Images, {
          where: { name: image.fileName },
        });
        if (existingImage) {
          return existingImage.id;
        }
        const newImage: Images = queryRunner.manager.create(Images, {
          name: image.fileName,
          path: image.path,
          type: image.mimeType,
        });
        await queryRunner.manager.save(newImage);

        const imageId = newImage.id;
        const newFileName = `${imageId}-${image.fileName}`;
        const originalDir = dirname(image.path);
        const newPath = join(originalDir, newFileName);
        renameSync(image.path, newPath);
        newImage.name = newFileName;
        newImage.path = newPath;
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
