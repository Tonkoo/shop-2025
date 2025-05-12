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
        middleware: ['11-auth-admin'],
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
      name: 'Catalog',
      path: '/catalog/:catalogPath(.*)*',
      meta: {
        layout: 'main-layout',
        middleware: ['02-slash-catalog'],
      },
      component: () =>
        import('~/pages/PageCatalog.vue').then((r) => r.default || r),
    },
    {
      name: 'Authorization',
      path: '/authorization',
      meta: {
        layout: 'authorization-layout',
        middleware: ['10-auth-login'],
      },
      component: () =>
        import('~/pages/PageAuthorization.vue').then((r) => r.default || r),
    },
  ],
};
