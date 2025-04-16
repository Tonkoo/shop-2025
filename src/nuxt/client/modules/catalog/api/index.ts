import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { api } from '#shared/api/axios';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';
import type { ResultItemsCatalog } from '~/interfaces/global';

export async function getItemCatalog() {
  const catalogStore = useCatalogStore();
  const layoutStores = useLayoutStores();

  const params = {
    url: catalogStore.pathPage,
    sorting: 'none',
    filter: JSON.stringify({
      price: { from: 0, to: 10000 },
      color: ['#000000'],
    }),
    layout: !layoutStores.menu.length,
    onlyFilters: false,
  };
  try {
    const response = await api.get<{ data: ResultItemsCatalog }>(
      `/elastic/catalog`,
      {
        params,
      }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    console.log(response.data.data);
    if (params.layout) {
      layoutStores.setMenu(response.data.data.layout.menu);
    }
    catalogStore.setItems(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
