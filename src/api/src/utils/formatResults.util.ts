import { camelCaseConverter } from './toCamelCase.util';
import { ResultItems } from '@interfaces/responseGlobal';
import { MainLayout } from '@interfaces/mainGlobal';
import { CatalogContent } from '@interfaces/catalogGlobal';
import { ProductElastic, SectionElastic } from '@interfaces/adminGlobal';
import { payLoad } from '@modules/elasticsearch/dto/elasticsearch.dto';
import { SectionDto } from '@modules/sections/dto/section.dto';
import { ProductDto } from '@modules/products/dto/product.dto';
import { ElasticsearchAdminService } from '@modules/elasticsearch/elasticsearch.admin.service';

/**
 * Форматирует данные для отправки на страницу Администратора
 * @param items
 * @param total
 */
export function formatResults(
  items: (SectionElastic | ProductElastic)[],
  total: { value: number },
): ResultItems {
  return {
    items: camelCaseConverter(items) as SectionElastic[] | ProductElastic[],
    total: total.value,
  };
}

/**
 * Проверяет, какой ответ отправить на фронт после добавления или изменения или удаления записи
 * @param filters
 * @param id
 * @param EsServices
 */
export async function formatResponse(
  filters: SectionDto | ProductDto,
  id: number,
  EsServices: ElasticsearchAdminService,
) {
  const searchParams: payLoad = {
    type: filters.type,
    from: Number(filters.from),
    size: Number(filters.size),
    searchName: filters.searchName,
  };

  return filters.getItems ? await EsServices.getItemsFilter(searchParams) : id;
}

/**
 * Форматирует данные для главной страницы
 * @param data
 * @param layout
 */
export function formatMainContent(
  data: ProductElastic[],
  layout: MainLayout | null,
) {
  const mainSlider = data.filter((item) => item.main_slider);
  const mainGifts = data.filter((item) => item.show_on_main);
  if (layout) {
    return {
      content: {
        mainSlider,
        mainGifts,
      },
      layout,
    };
  }
  return {
    content: {
      mainSlider,
      mainGifts,
    },
  };
}

/**
 * Форматирует данные для страницы Каталог
 * @param result
 * @param layout
 * @param onlyFilters
 */

export function formatCatalogContent(
  result: CatalogContent,
  layout: MainLayout | null,
  onlyFilters: boolean,
) {
  const { contentName, totalItems, filter } = result;

  if (onlyFilters) {
    return {
      content: {
        contentName,
        totalItems,
        filter,
      },
    };
  }
  if (layout) {
    return {
      content: {
        ...result,
      },
      layout,
    };
  }
  return {
    content: {
      ...result,
    },
  };
}
