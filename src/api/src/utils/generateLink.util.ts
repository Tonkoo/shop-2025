import { Sections } from './../entities/sections.entity.js';
import { NotFoundException } from '@nestjs/common';
import { Products } from './../entities/products.entity.js';
import { ProductElastic, SectionElastic } from './../interfaces/adminGlobal.js';

/**
 * Генерирует ссылку для продукта
 * @param data
 * @param sectionId
 * @param sections
 * @param pathParts
 */
export function generateLinkProduct(
  data: Products | ProductElastic,
  sectionId: number,
  sections: Sections[],
  pathParts: string[] = [],
) {
  const section = sections.find((item) => item.id === sectionId);
  if (!section) {
    throw new NotFoundException('Section not Found');
  }
  pathParts.unshift(section.code);

  if (section.id_parent) {
    return generateLinkProduct(data, section.id_parent, sections, pathParts);
  }

  return `/catalog/${pathParts.join('/')}/${data.code}/`;
}

/**
 * Генерирует ссылку для раздела
 * @param data
 * @param sections
 * @param pathParts
 */
export function generateLinkSection(
  data: Sections | SectionElastic,
  sections: Sections[],
  pathParts: string[] = [],
) {
  pathParts.unshift(data.code);
  if (data.id_parent) {
    const sectionParent = sections.find((item) => item.id === data.id_parent);
    if (!sectionParent) {
      throw new NotFoundException('Section not Found');
    }

    return generateLinkSection(sectionParent, sections, pathParts);
  }
  return `/catalog/${pathParts.join('/')}/`;
}
