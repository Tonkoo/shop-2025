import type { RouteRecordRaw } from 'vue-router';

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
  // Мидлварины
  middleware?: Array<'01-slash-catalog' | '02-auth-login' | '03-auth-admin'>;
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
