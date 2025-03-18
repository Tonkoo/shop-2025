import type { RouterConfig } from '@nuxt/schema';
import type { Routes } from '~/app/types/router.types';
// import PageAdmin from '../pages/PageAdmin.vue';

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
  ],
};
