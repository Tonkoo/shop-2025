import type { Product, Section } from '~/interfaces/global';

export function getParentSection(data: Section[] | Product[]) {
  return data.filter((section) => section.level === 1);
}

export function getChildSection(data: Section[] | Product[], parentId: number) {
  return data.filter(
    (section) => section.level === 2 && section.idParent === parentId
  );
}
