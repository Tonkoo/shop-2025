import type { imageObject, typeFile } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export async function convertFile(imageObject: imageObject[] | undefined) {
  const adminStore = useAdminStore();
  if (!imageObject) {
    return [];
  }
  const filesWithId: File[] = await Promise.all(
    imageObject.map(async (image) => {
      const response = await fetch(image.path);
      const blob = await response.blob();

      const file = new File([blob], image.name, { type: image.type });
      return file;
    })
  );
  adminStore.setSectionImages(filesWithId);
  adminStore.setConvertSelectedSectionImages(filesWithId);
}
