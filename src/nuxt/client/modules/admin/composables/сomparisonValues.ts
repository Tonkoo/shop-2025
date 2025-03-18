import type { Section } from '~/interfaces/global';
import { isEqual } from 'lodash';

export function comparisonValues(section: Section, oldSection: Section | null) {
  const resultSection: Record<string, any> = {};
  if (!isEqual(section.name, oldSection?.name)) {
    resultSection.name = section.name;
  }
  if (!isEqual(section.images, oldSection?.images)) {
    resultSection.images = section.images;
  }
  if (!isEqual(section.parent, oldSection?.parent)) {
    resultSection.id_parent = section.parent?.id;
  }
  return resultSection;
}
