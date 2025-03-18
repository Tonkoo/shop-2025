import { api } from '#shared/api/axios.js';
import type { resultItems, Section } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { isEqual } from 'lodash';
//TODO: Вынести в папку composables
function ComparisonValues(section: Section, oldSection: Section | null) {
  const resultSection: Record<string, any> = {};
  if (!isEqual(section.name, oldSection?.name)) {
    resultSection.name = section.name;
  }
  if (!isEqual(section.images, oldSection?.images)) {
    resultSection.images = section.images;
  }
  if (!isEqual(section.parent, oldSection?.parent)) {
    resultSection.id_parent = section.parent?.id;
  }
  return resultSection;
}

export async function getItems() {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
      from: (adminStore.currentPage - 1) * adminStore.countColumn,
      size: adminStore.countColumn,
      searchName: adminStore.searchName,
    };
    const response = await api.get<{ data: resultItems[] }>('/elastic/admin', {
      params,
    });
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}

export async function getAllNameColumn() {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
      searchName: adminStore.searchName
        ? adminStore.searchName
        : adminStore.searchParentName,
      size: adminStore.countColumn,
    };
    const response = await api.get('/elastic/admin/name', {
      params,
    });
    adminStore.setNameItems(response.data.data);
  } catch (err) {
    console.error(err);
  }
}

export async function addSection() {
  const adminStore = useAdminStore();
  try {
    adminStore.setSearchName('');
    const formData = new FormData();
    const param = {
      type: adminStore.typeItem,
      from: ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      size: adminStore.countColumn.toString(),
      searchName: adminStore.searchName,
      getSection: true,
    };

    //TODO: Вынести в отдельный файл
    Object.entries(adminStore.section).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach((file) => {
          formData.append('files', file);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    Object.entries(param).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    //TODO: Вынести headers в отдельный метод
    const response = await api.post<{ data: resultItems[] }>(
      '/section',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    //TODO: Сделать проверки на пустой responses и валидация
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editSection() {
  const adminStore = useAdminStore();
  try {
    //TODO: переименовать переменные frontSection и backSection
    const editSection = ComparisonValues(
      adminStore.section,
      adminStore.selectedSection
    );
    const formData = new FormData();
    const param = {
      type: adminStore.typeItem,
      from: ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      size: adminStore.countColumn.toString(),
      searchName: adminStore.searchName,
      getSection: true,
    };
    Object.entries(editSection).forEach(([key, value]) => {
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

    adminStore.setSearchName('');
    const response = await api.put<{ data: resultItems[] }>(
      `/section/${adminStore.selectedSection?.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getSection() {
  const adminStore = useAdminStore();
  const params = {
    id: adminStore.selectedId,
  };
  try {
    const response = await api.get('/section', { params: params });
    await adminStore.setSelectedSection(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
