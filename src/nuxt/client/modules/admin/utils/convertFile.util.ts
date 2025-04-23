import type { ImageObject } from '~/interfaces/global';

export async function convertFile(imageObject: ImageObject[] | undefined) {
  if (!imageObject) {
    return [];
  }
  const filesWithId: File[] = await Promise.all(
    imageObject.map(async (image) => {
      const response = await fetch(image.path);
      const blob = await response.blob();
      return new File([blob], image.name, { type: image.type });
    })
  );
  return filesWithId;
}
