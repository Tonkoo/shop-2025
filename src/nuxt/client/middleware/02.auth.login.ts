import { api } from '#shared/api/axios';

export default defineNuxtRouteMiddleware(async (to) => {
  // const token = useCookie('access_token');
  // if (token.value) {
  //   try {
  //     const response = await api.get(
  //       'http://localhost/realms/shop-admin/protocol/openid-connect/userinfo',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token.value}`,
  //         },
  //       }
  //     );
  //     if (response.data) {
  //       if (to.path === '/login') {
  //         return navigateTo('/admin');
  //       }
  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
});
