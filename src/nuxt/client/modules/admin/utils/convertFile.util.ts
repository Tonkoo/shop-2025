import type { imageObject } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export async function convertFile(imageObject: imageObject[] | undefined) {
  const adminStore = useAdminStore();
  if (!imageObject) {
    return [];
  }
  const files: File[] = await Promise.all(
    imageObject.map(async (image) => {
      const response = await fetch(image.path);
      const blob = await response.blob();
      return new File([blob], image.name, { type: image.type });
    })
  );
  adminStore.setFormFile(files);
}
