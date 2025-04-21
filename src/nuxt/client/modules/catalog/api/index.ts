import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { useDetailPageStore } from '~/modules/catalog/stores/detailPageStore';
import { api } from '#shared/api/axios';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';
import type { ProductMain, ResultItemsCatalog } from '~/interfaces/global';

export async function getItemCatalog() {
  const catalogStore = useCatalogStore();
  const layoutStores = useLayoutStores();
  const detailPageStore = useDetailPageStore();
  const params = {
    url: layoutStores.pathPage,
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
    layoutStores.setTypePage(response.data.data.content.typeItem);
    if (layoutStores.typePage === 'section') {
      if (params.onlyFilters) {
        if (catalogStore.filterPrice) {
          catalogStore.setAvailableColors(
            response.data.data.content.filter.color
          );
          catalogStore.setFilterPrice(false);
        }
        catalogStore.setOnlyFilter(false);
        catalogStore.setTotalItems(response.data.data.content.totalItems);
      } else {
        if (params.layout) {
          layoutStores.setMenu(response.data.data.layout.menu);
        }
        catalogStore.setItems(response.data.data);
        catalogStore.setAvailableColors(
          response.data.data.content.filter.color
        );
      }
    }
    if (layoutStores.typePage === 'product') {
      detailPageStore.setProduct(
        response.data.data.content.itemCatalog as ProductMain
      );
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
