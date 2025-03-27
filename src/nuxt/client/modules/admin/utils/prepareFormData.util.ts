import type {
  ApiParams,
  ProductAdmin,
  SectionAdmin,
} from '~/interfaces/global';

export function generateFormData(
  formData: FormData,
  data: SectionAdmin | ProductAdmin | Record<string, any>,
  param: ApiParams
) {
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'images' && Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(key, '');
      } else {
        (value as File[]).forEach((file) => {
          formData.append('files', file);
        });
      }
    } else {
      formData.append(key, String(value));
    }
  });

  Object.entries(param).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  return formData;
}
