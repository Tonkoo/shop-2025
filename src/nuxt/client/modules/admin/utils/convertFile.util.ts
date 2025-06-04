import type { ImageObject } from '~/interfaces/adminGlobal';

export async function convertFile(imageObject: ImageObject[] | undefined) {
  if (!imageObject) {
    return [];
  }
  const filesWithId: File[] = await Promise.all(
    imageObject.map(async (image) => {
      try {
        const response = await fetch(
          `http://localhost/${image.path}`
        );
        const blob = await response.blob();
        return new File([blob], image.name, { type: image.type });
      } catch (e) {
        console.error(e);
        throw e;
      }
    })
  );
  return filesWithId;
}
