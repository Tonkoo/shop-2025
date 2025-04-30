import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { useDetailPageStore } from '~/modules/catalog/stores/detailPageStore';
import { api } from '#shared/api/axios';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';
import type { ResultItemsCatalog } from '~/interfaces/resultGlobal';
import type { ProductMain } from '~/interfaces/mainGlobal';
export async function getItemCatalog() {
  const catalogStore = useCatalogStore();
  const layoutStores = useLayoutStores();
  const detailPageStore = useDetailPageStore();
  const params = {
    url: layoutStores.pathPage,
    filter: JSON.stringify(catalogStore.filterCatalog),
    layout: !layoutStores.menu.length,
    isFilter: catalogStore.isFilter,
    onlyFilters: catalogStore.onlyFilter,
    isSorting: catalogStore.isSorting,
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
    if (response.data.data.content.typeItem) {
      layoutStores.setTypePage(response.data.data.content.typeItem);
    }
    if (params.layout) {
      layoutStores.setMenu(response.data.data.layout.menu);
    }
    if (layoutStores.typePage === 'section') {
      if (params.onlyFilters) {
        if (catalogStore.filterPrice) {
          if (
            !catalogStore.filterCatalog.priceFrom &&
            !catalogStore.filterCatalog.priceTo
          ) {
            catalogStore.setAvailableColors(catalogStore.filter.color);
          } else {
            catalogStore.setAvailableColors(
              response.data.data.content.filter.color
            );
          }

          catalogStore.setFilterPrice(false);
        }
        catalogStore.setOnlyFilter(false);
        catalogStore.setTotalItems(response.data.data.content.totalItems);
      } else {
        catalogStore.setItems(response.data.data);
        if (catalogStore.isFilter) {
          catalogStore.setFilter(response.data.data);
          catalogStore.setAvailableColors(
            response.data.data.content.filter.color
          );
        }
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
