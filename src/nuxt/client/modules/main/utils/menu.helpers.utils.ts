import type { Product, Section } from '~/interfaces/global';

export function getParentSection(data: Section[] | Product[]) {
  return data.filter((section) => section.level === 1);
}

export function getChildSection(
  data: Section[] | Product[],
  parentId: number,
  level: number
) {
  return data.filter(
    (section) => section.level === level && section.idParent === parentId
  );
}
