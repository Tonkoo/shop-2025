import { ProductEntities, SectionEntities } from '../interfaces/global';
import { Repository } from 'typeorm';
import { Sections } from '../entities/sections.entity';
import { NotFoundException } from '@nestjs/common';

/**
 * Генерирует ссылку для продукта
 * @param data
 * @param sectionsRepository
 */
export async function generateLinkProduct(
  data: ProductEntities,
  sectionsRepository: Repository<Sections>,
) {
  const section = await sectionsRepository.findOne({
    where: { id: data.section.id },
  });
  if (!section) {
    throw new NotFoundException('Section not Found');
  }
  if (section.id_parent) {
    const sectionParent = await sectionsRepository.findOne({
      where: { id: section.id_parent },
    });
    if (!sectionParent) {
      throw new NotFoundException('Section not Found');
    }
    return `/catalog/${sectionParent.code}/${section.code}/${data.code}/`;
  }
  return `/catalog/${section.code}/${data.code}/`;
}

/**
 * Генерирует ссылку для раздела
 * @param data
 * @param sectionsRepository
 */
export async function generateLinkSection(
  data: SectionEntities,
  sectionsRepository: Repository<Sections>,
) {
  if (data.id_parent) {
    const sectionParent = await sectionsRepository.findOne({
      where: { id: data.id_parent },
    });
    if (!sectionParent) {
      throw new NotFoundException('Section not Found');
    }
    return `/catalog/${sectionParent.code}/${data.code}/`;
  }
  return `/catalog/${data.code}/`;
}
