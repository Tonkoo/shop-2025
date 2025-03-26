export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-swiper',
  ],
  i18n: {
    vueI18n: './config/i18n.config.ts',
  },
  quasar: {
    plugins: ['Notify'],
    config: {
      notify: {},
    },
  },
  // runtimeConfig: {
  //   urlApi: process.env.NUXT_API_URL,
  // },
  ssr: false,
  devtools: { enabled: false },
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
  srcDir: 'client',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  compatibilityDate: '2024-11-01',
});