import type { RouteRecordRaw } from 'vue-router';

// TODO: лишнее убрать
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
  middleware?: Array<'02-slash-catalog' | '10-auth-login' | '11-auth-admin'>;
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
