import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { api } from '#shared/api/axios';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';

export async function getItemCatalog() {
  const catalogStore = useCatalogStore();
  const layoutStores = useLayoutStores();

  const params = {
    layout: !layoutStores.menu.length,
    catalog:
      catalogStore.paramCatalog?.childCatalogCode ??
      catalogStore.paramCatalog?.parentCatalogCode ??
      undefined,
  };
  try {
    const response = await api.get(`/elastic/catalog`, {
      params: params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
