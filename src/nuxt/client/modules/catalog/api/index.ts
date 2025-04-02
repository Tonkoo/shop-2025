import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { api } from '#shared/api/axios';

// export async function getSectionByName() {
//   const catalogStore = useCatalogStore();
//   const params = {
//     name: catalogStore.selectedId,
//   };
//   try {
//     const response = await api.get(`/section/name`, {
//       params: params,
//     });
//     if (!response) {
//       throw new Error('Error while receiving data');
//     }
//     if (adminStore.typeSearch.value == 'section') {
//       await adminStore.setBackSection(response.data.data);
//     } else {
//       await adminStore.setBackProduct(response.data.data);
//     }
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }
