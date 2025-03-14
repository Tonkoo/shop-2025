import { QueryRunner } from 'typeorm';
import { Images } from '../entities/images.entity';
import { logger } from './logger/logger';
import { BadRequestException } from '@nestjs/common';
import { renameSync } from 'fs';
import { join, dirname } from 'path';

interface ImageData {
  fileName: string;
  path: string;
  mimeType: string;
}

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
