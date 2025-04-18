import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { api } from '#shared/api/axios';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';
import type { ResultItemsCatalog } from '~/interfaces/global';

export async function getItemCatalog() {
  const catalogStore = useCatalogStore();
  const layoutStores = useLayoutStores();
  const params = {
    url: catalogStore.pathPage,
    filter: JSON.stringify(catalogStore.filterCatalog),
    layout: !layoutStores.menu.length,
    onlyFilters: catalogStore.onlyFilter,
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

    if (params.onlyFilters) {
      catalogStore.setOnlyFilter(false);
      catalogStore.setTotalItems(response.data.data.content.totalItems);
      catalogStore.setAvailableColors(response.data.data.content.filter.color);
    } else {
      if (params.layout) {
        layoutStores.setMenu(response.data.data.layout.menu);
        catalogStore.setFilter(response.data.data);
      }

      catalogStore.setItems(response.data.data);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
