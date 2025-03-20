import type { Product, Section } from '~/interfaces/global';
import { isEqual } from 'lodash';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export function comparisonValues(
  data: Section | Product,
  oldData: Section | Product | null
) {
  const adminStore = useAdminStore();
  const resultSection: Partial<Section | Product> = {};
  if (!isEqual(data.name, oldData?.name)) {
    resultSection.name = data.name;
  }
  if (!isEqual(data.images, oldData?.images)) {
    resultSection.images = data.images;
  }
  if (adminStore.typeItem == 'section') {
    if (!isEqual(data.parent, oldData?.parent)) {
      resultSection.id_parent = data.parent?.id;
    }
  } else {
    if (!isEqual(data.price, oldData?.price)) {
      resultSection.price = data.price;
    }
    if (!isEqual(data.color, oldData?.color)) {
      resultSection.color = data.color;
    }
    if (!isEqual(data.description, oldData?.description)) {
      resultSection.color = data.color;
    }
    if (!isEqual(data.section, oldData?.section)) {
      resultSection.section = data.section;
    }
    if (!isEqual(data.showOnMain, oldData?.showOnMain)) {
      resultSection.showOnMain = data.showOnMain;
    }
    if (!isEqual(data.showOnMain, oldData?.showOnMain)) {
      resultSection.mainSlider = data.mainSlider;
    }
  }

  return resultSection;
}
