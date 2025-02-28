export default defineNuxtConfig({
  modules: ['nuxt-quasar-ui', '@nuxt/eslint'],
  // runtimeConfig: {
  //   urlApi: process.env.NUXT_API_URL,
  // },
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
      ],
    },
  },
  // css: ['/client/commonUI/assets/sass/index.scss'],
  srcDir: 'client',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  compatibilityDate: '2024-11-01',
});