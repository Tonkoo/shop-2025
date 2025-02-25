export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },

  // runtimeConfig: {
  //   urlApi: process.env.NUXT_API_URL,
  // },
  ssr: false,

  modules: ["nuxt-quasar-ui"],
});