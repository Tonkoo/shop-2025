import { api } from '#shared/api/axios';
import type { ResultItemsMain } from '~/interfaces/resultGlobal';
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';

export async function getItems() {
  try {
    const mainStores = useMainStores();
    const layoutStores = useLayoutStores();

    const params = {
      layout: !layoutStores.menu.length,
    };
    const response = await api.get<{ data: ResultItemsMain }>(
      '/elastic/main/',
      { params }
    );
    console.log(response);
    if (!response) {
      throw new Error('Error while receiving data');
    }
    mainStores.setItems(response.data.data);
    if (params.layout) {
      layoutStores.setMenu(response.data.data.layout.menu);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
