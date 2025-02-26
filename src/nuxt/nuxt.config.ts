export default defineNuxtConfig({
  modules: ['nuxt-quasar-ui'],

  // runtimeConfig: {
  //   urlApi: process.env.NUXT_API_URL,
  // },
  ssr: false,
  devtools: { enabled: true },
  srcDir: 'client',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  compatibilityDate: '2024-11-01',
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
})
