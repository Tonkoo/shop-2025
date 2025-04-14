import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { api } from '#shared/api/axios';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';
import type { ResultItemsCatalog } from '~/interfaces/global';

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
    const response = await api.get<{ data: ResultItemsCatalog }>(
      `/elastic/catalog`,
      {
        params: params,
      }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    if (params.layout) {
      layoutStores.setMenu(response.data.data.layout.menu);
    }
    catalogStore.setItems(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
