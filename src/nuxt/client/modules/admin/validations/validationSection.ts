import type { Err, SectionAdmin } from '~/interfaces/adminGlobal';
import { sectionSchema } from '~/modules/admin/schemas/sectionSchema';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export function validationSection(data: SectionAdmin) {
  const adminStore = useAdminStore();
  const validationResult = sectionSchema.safeParse(data);
  const errors: Err = {};
  if (!validationResult.success) {
    const formattedErrors = validationResult.error.format();
    if (formattedErrors.name) {
      errors.name = formattedErrors.name._errors[0];
    }
    adminStore.setError(errors);
    throw new Error('Validation failed');
  }
}
