import { api } from '~~/shared/api/axios';
import type {
  ApiParams,
  ResultItemsAdmin,
  ResultReindex,
} from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { comparisonValues } from '~/modules/admin/composables/сomparisonValues';
import { headers } from '~/composables/customFetch';
import { generateFormData } from '~/modules/admin/utils/prepareFormData.util';
import { productParams, sectionParams } from '~/entities/search.entites';
import { sectionSchema } from '~/modules/admin/dto/validationSchema';

function removeDots(data: string): string {
  if (!data) {
    return data;
  }
  return data.replace(/^\.+/g, '');
}
// function validateForm() {
//   const adminStore = useAdminStore();
//   const { typeItem, frontSection, frontProduct } = adminStore;
//   let isValid = true;
//
//   adminStore.setClearError();
//
//   if (typeItem === 'section') {
//     if (!frontSection.name.trim()) {
//       adminStore.setErrorName(true);
//       adminStore.setErrorNameMessages(
//         'Поле "Название" обязательно для заполнения'
//       );
//       isValid = false;
//     }
//     if (frontSection.name.length < 3) {
//       adminStore.setErrorName(true);
//       adminStore.setErrorNameMessages(
//         'Название должно быть не короче 3 символов'
//       );
//       isValid = false;
//     }
//     if (frontSection.name.length > 50) {
//       adminStore.setErrorName(true);
//       adminStore.setErrorNameMessages(
//         'Название не может быть длиннее 50 символов'
//       );
//       isValid = false;
//     }
//   } else {
//     if (!frontProduct.name.trim()) {
//       adminStore.setErrorName(true);
//       isValid = false;
//     }
//
//     if (frontProduct.name.length < 3) {
//       adminStore.setErrorName(true);
//       isValid = false;
//     }
//     if (frontProduct.name.length > 50) {
//       adminStore.setErrorName(true);
//       isValid = false;
//     }
//
//     if (!frontProduct.price) {
//       adminStore.setErrorPrice(true);
//       isValid = false;
//     }
//
//     if (!Number(frontProduct.price)) {
//       adminStore.setErrorPrice(true);
//       isValid = false;
//     }
//
//     // if (!frontProduct.color.trim()) {
//     //   adminStore.setErrorColor(true);
//     //   isValid = false;
//     // }
//
//     if (!frontProduct.description.trim()) {
//       adminStore.setErrorDescription(true);
//       isValid = false;
//     }
//
//     if (!frontProduct.section?.id || !frontProduct.section?.name.trim()) {
//       adminStore.setErrorSection(true);
//       isValid = false;
//     }
//   }
//
//   if (!isValid) {
//     throw new Error('The form is filled in incorrectly');
//   }
// }

function fillingParam(
  type: string,
  from: string | number,
  size: string | number,
  searchName: string,
  filterSection?: number,
  getItem?: boolean
) {
  const params: ApiParams = {
    type,
    from,
    size,
    searchName,
  };
  if (filterSection) {
    params.filterSection = filterSection;
  }
  if (getItem) {
    params.getItems = getItem;
  }

  return params;
}

export async function reindex() {
  try {
    const adminStore = useAdminStore();
    const params = fillingParam(
      adminStore.typeSearch.value,
      (adminStore.currentPage - 1) * adminStore.countColumn,
      adminStore.countColumn,
      adminStore.searchName,
      undefined,
      true
    );
    adminStore.setTypeItem(adminStore.typeSearch.value);
    const response = await api.get<{
      data: ResultItemsAdmin | ResultReindex;
    }>('/elastic/reindex', {
      params,
    });
    if (!response) {
      throw new Error('Indexing error');
    }
    if ('message' in response.data.data) {
      console.log('Reindex result:', response.data.data.message);
      return;
    }
    const resultData = response.data.data as ResultItemsAdmin;
    adminStore.setDataItems(resultData);
  } catch (err) {
    console.error('Indexing error ' + err);
    throw new Error('Indexing error.');
  }
}

export async function getItems() {
  const adminStore = useAdminStore();
  try {
    const params = fillingParam(
      adminStore.typeSearch.value,
      (adminStore.currentPage - 1) * adminStore.countColumn,
      adminStore.countColumn,
      removeDots(adminStore.searchName),
      adminStore.filterSection?.id
    );
    adminStore.setNameColumnSection(
      adminStore.typeSearch.label === 'Разделы'
        ? 'Родительский раздел'
        : 'Раздел'
    );
    // adminStore.setTypeItem(adminStore.typeSearch.value);
    const response = await api.get<{ data: ResultItemsAdmin }>(
      '/elastic/admin',
      {
        params,
      }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    // if (adminStore.typeSearch.value == 'section') {
    //   adminStore.setItemsFilter(response.data.data[0]);
    // }
    adminStore.setDataItems(response.data.data);
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}

export async function getAllNameColumn(type: string, typeForm?: string) {
  const adminStore = useAdminStore();
  try {
    const typeParams = type === 'section' ? sectionParams : productParams;

    const params: ApiParams = {
      ...typeParams,
      searchName:
        removeDots(adminStore.searchName) ??
        removeDots(adminStore.searchParentName) ??
        removeDots(adminStore.searchSection) ??
        '',
    };
    if (typeForm) {
      params.typeForm = adminStore.typeItem;
    }

    const response = await api.get('/elastic/admin/name', {
      params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setNameItems(response.data.data);
    adminStore.setItemsFilter(response.data.data);
  } catch (err) {
    console.error(err);
  }
}

export async function addItem() {
  const adminStore = useAdminStore();
  try {
    const validationResult = sectionSchema.safeParse(adminStore.frontSection);
    // TODO: обрабатывать ошибки в validationResult с помощью forReach
    // TODO: создать один метод в adminStore для заполенения объекта с ошибками.
    // TODO: Создать две папки Schemas, Validations. В Schema будут храниться схемы для валидации. в Validations будут храниться обработчик ошибок с помощью forReach

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      if (formattedErrors.name) {
        adminStore.setErrorName(true);
        adminStore.setErrorNameMessages(formattedErrors.name._errors[0]);
      }

      throw new Error('Validation failed');
    }

    adminStore.setSearchName('');
    const formData = new FormData();
    const param: ApiParams = fillingParam(
      adminStore.typeSearch.value,
      ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      adminStore.countColumn.toString(),
      removeDots(adminStore.searchName),
      undefined,
      true
    );
    // validateForm();
    let data;
    if (adminStore.typeItem === 'section') {
      data = adminStore.frontSection;
    } else {
      data = adminStore.frontProduct;
    }
    generateFormData(formData, data, param);
    const response = await api.post<{ data: ResultItemsAdmin }>(
      `/${adminStore.typeItem}`,
      formData,
      headers
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setDataItems(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editItem() {
  const adminStore = useAdminStore();
  try {
    let data;
    if (adminStore.typeItem === 'section') {
      data = comparisonValues(adminStore.frontSection, adminStore.backSection, [
        'id',
        'level',
        'code',
      ]);
    } else {
      data = comparisonValues(adminStore.frontProduct, adminStore.backProduct, [
        'id',
        'code',
        'idSection',
        'sectionName',
        'sectionId',
      ]);
    }
    if (data.section) {
      data.sectionId = data.section.id;
      data.sectionName = data.section.name;
    }
    if (data.parent) {
      data.idParent = data.parent.id;
    }

    const formData = new FormData();
    const param: ApiParams = fillingParam(
      adminStore.typeSearch.value,
      ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      adminStore.countColumn.toString(),
      adminStore.searchName,
      undefined,
      true
    );

    // validateForm();

    generateFormData(formData, data, param);
    adminStore.setSearchName('');
    const response = await api.put<{ data: ResultItemsAdmin }>(
      `/${adminStore.typeItem}/${adminStore.selectedId}`,
      formData,
      headers
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setDataItems(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getItemById() {
  const adminStore = useAdminStore();
  const params = {
    id: adminStore.selectedId,
  };
  try {
    const response = await api.get(`/${adminStore.typeSearch.value}/id`, {
      params: params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
    if (adminStore.typeSearch.value == 'section') {
      await adminStore.setBackSection(response.data.data);
    } else {
      await adminStore.setBackProduct(response.data.data);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function delItem() {
  const adminStore = useAdminStore();
  const params: ApiParams = fillingParam(
    adminStore.typeSearch.value,
    ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
    adminStore.countColumn.toString(),
    adminStore.searchName,
    undefined,
    true
  );
  try {
    const response = await api.delete<{ data: ResultItemsAdmin }>(
      `/${adminStore.typeSearch.value}/${adminStore.selectedId}`,
      { params }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setDataItems(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function getColors() {
  const adminStore = useAdminStore();
  try {
    const response = await api.get('product/colors');

    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setColors(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
