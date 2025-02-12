export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
  ssr: false,
  // runtimeConfig: {
  //   urlApi: process.env.NUXT_API_URL,
  // },
});
