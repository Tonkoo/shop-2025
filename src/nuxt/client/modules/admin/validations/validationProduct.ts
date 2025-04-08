import type { Err, ProductAdmin } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { productSchema } from '~/modules/admin/schemas/productSchema';

export function validationProduct(data: ProductAdmin) {
  const adminStore = useAdminStore();
  const validationResult = productSchema.safeParse(data);
  const errors: Err = {};
  if (!validationResult.success) {
    const formattedErrors = validationResult.error.format();
    if (formattedErrors.name) {
      errors.name = formattedErrors.name._errors[0];
    }
    if (formattedErrors.price) {
      errors.price = formattedErrors.price._errors[0];
    }
    if (formattedErrors.color?.id) {
      errors.color = formattedErrors.color.id._errors[0];
    }
    if (formattedErrors.description) {
      errors.description = formattedErrors.description._errors[0];
    }
    if (formattedErrors.section?.id) {
      errors.section = formattedErrors.section.id._errors[0];
    }
    adminStore.setError(errors);
    throw new Error('Validation failed');
  }
}
