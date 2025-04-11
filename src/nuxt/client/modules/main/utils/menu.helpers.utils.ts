import type { SectionMain } from '~/interfaces/global';

export function getParentSection(data: SectionMain[]) {
  return data.filter((section) => section.level === 1);
}
