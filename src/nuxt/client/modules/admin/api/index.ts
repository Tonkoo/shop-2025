import { api } from '#shared/api/axios.js';
import type { resultItems, Section, SectionBack } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

function compareObjects(frontData: Section, backData: SectionBack): boolean {
  // Сравниваем только те поля, которые могут быть изменены
  return (
    frontData.code === backData.code &&
    frontData.name === backData.name &&
    frontData.images === backData.images &&
    frontData.id_parent === backData.id_parent
  );
}
// Promise<Section[] | Product[]>
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

    const response = await api.post<{ data: resultItems[] }>(
      '/section',
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

export async function editSection() {
  const adminStore = useAdminStore();
  try {
    adminStore.setSearchName('');
    const formData = new FormData();

    const hasChanges = !compareObjects(
      adminStore.section,
      adminStore.sectionBackend
    );

    // if (hasChanges) {
    //   Object.keys(adminStore.section).forEach((key) => {
    //     const value = adminStore.section[key as keyof Section];
    //     const backendValue =
    //       adminStore.sectionBackend[key as keyof SectionBack];
    //
    //     if (value !== backendValue) {
    //       if (key === 'images' && Array.isArray(value)) {
    //         value.forEach((file, index) => {
    //           formData.append(`images[${index}]`, file);
    //         });
    //       } else if (value !== undefined && value !== null) {
    //         // Для остальных данных преобразуем их в строку
    //         formData.append(key, String(value));
    //       }
    //     }
    //   });
    //
    //   const param = {
    //     type: adminStore.typeItem,
    //     from: (
    //       (adminStore.currentPage - 1) *
    //       adminStore.countColumn
    //     ).toString(),
    //     size: adminStore.countColumn.toString(),
    //     searchName: adminStore.searchName,
    //     getSection: true,
    //   };
    //
    //   const response = await api.put<{ data: resultItems[] }>(
    //     '/section',
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    //   );
    //
    //   adminStore.setDataItems(response.data.data[0]);
    // } else {
    //   console.log('Нет изменений для отправки на сервер.');
    // }
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
    adminStore.setSectionBack(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
