export default defineNuxtRouteMiddleware((to) => {
  if (!/.*\/$/.test(to.path)) {
    return navigateTo(to.fullPath.replace(to.path, `${to.path}/`));
  }
});
