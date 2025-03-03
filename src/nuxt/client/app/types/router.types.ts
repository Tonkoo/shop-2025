import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

type RouterScrollPosition = {
  behavior?: ScrollOptions['behavior'];
  el?: string | Element;
  left?: number;
  top?: number;
};
type RouterGetCustomPosition = () => RouterScrollPosition;
type RouterMeta = {
  // Тип шаблона
  layout: 'main-layout' | 'admin-layout';
  // Показывать ли мобильное меню
  mobileMenu?: boolean;
  // Показывать ли объявление
  announcement?: boolean;
  // Особые настройки футера
  footer?: 'gifts' | 'magazines';
  // Мидлварины
  middleware?: Array<'04-canary' | '06-external' | '08-postpone' | '10-auth'>;
  // Флаг тестовой страницы
  test?: boolean;
  // Белый ли хедер вверху
  whiteTopHeader?: boolean;
  // Композитная функция для ручного расчета позиции страницы между переходами
  customScrollCmpFn?: (
    to: RouteLocationNormalized,
    savedPosition: RouterScrollPosition | null
  ) => { getCustomPosition: RouterGetCustomPosition };
  // TODO - ZM
  // Используется в сеелкторе подстранциы
  subPageSelector: {
    // i18n ЛэнгКлючСтраницы
    langTitleKey?: string;
  };
  // Флаг не сохранения скролла между переходами
  noSavedScroll?: boolean;
  // Флаг на отсутствия отступа после контентом
  noLayoutAfterContentOffset?: boolean;
  // Флаг для блокировки сколла при схожем урле
  noScrollTop?: boolean;
  // Прижата ли шапка к верху на мобиле
  headerNotFixedOnMobile?: boolean;
  // Показывать ли шапку на мобиле
  headerHideOnMobile?: boolean;
  // Показывать ли футер в мобиле
  footerHideOnMobile?: boolean;
  // Облегченная версия шапки
  headerShort?: boolean;
  //TODO - ZM OFF
};
type Routes = Array<
  Pick<RouteRecordRaw, 'name' | 'path' | 'component'> & {
    meta: RouterMeta;
  }
>;
export {
  type Routes,
  type RouterMeta,
  type RouterScrollPosition,
  type RouterGetCustomPosition,
};
