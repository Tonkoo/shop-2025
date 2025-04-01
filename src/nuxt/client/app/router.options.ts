import type { RouterConfig } from '@nuxt/schema';
import type { Routes } from '~/app/types/router.types';

export default <RouterConfig & { routes: () => Routes }>{
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: () => [
    {
      name: 'AdminIndex',
      path: '/admin',
      meta: {
        layout: 'admin-layout',
      },
      component: () =>
        import('~/pages/PageAdmin.vue').then((r) => r.default || r),
    },
    {
      name: 'MainIndex',
      path: '/',
      meta: {
        layout: 'main-layout',
      },
      component: () =>
        import('~/pages/PageMain.vue').then((r) => r.default || r),
    },
    {
      name: 'CatalogParent',
      path: '/catalog/:parentCatalogCode',
      meta: {
        layout: 'main-layout',
      },
      component: () =>
        import('~/pages/PageCatalog.vue').then((r) => r.default || r),
    },
    {
      name: 'CatalogChild',
      path: '/catalog/:parentCatalogCode/:childCatalogCode',
      meta: {
        layout: 'main-layout',
      },
      component: () =>
        import('~/pages/PageCatalog.vue').then((r) => r.default || r),
    },
    {
      name: 'CatalogNested',
      path: '/catalog/:parentCatalogCode/:childCatalogCode/:nestedChildCatalogCode',
      meta: {
        layout: 'main-layout',
      },
      component: () =>
        import('~/pages/PageCatalog.vue').then((r) => r.default || r),
    },
  ],
};
