import type { SectionMain } from '~/interfaces/mainGlobal';

export function getParentSection(data: SectionMain[]) {
  return data.filter((section) => section.level === 1);
}
