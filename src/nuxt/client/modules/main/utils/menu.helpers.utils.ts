import type { StoreItem } from '~/interfaces/global';

export function getParentSection(data: StoreItem[]) {
  return data.filter((section) => section.level === 1);
}

export function getChildSection(
  data: StoreItem[],
  parentId: number,
  level: number
) {
  return data.filter(
    (section) => section.level === level && section.idParent === parentId
  );
}
