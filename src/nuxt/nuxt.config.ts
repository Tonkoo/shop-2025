import { process } from 'std-env';

export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    '@sidebase/nuxt-auth',
  ],
  auth: {
    provider: {
      type: 'authjs',
    },
    baseURL: 'http://localhost/authorization',
  },
  runtimeConfig: {
    public: {
      port: Number(process.env.NUXT_PUBLIC_PORT),
      baseURL: process.env.NUXT_PUBLIC_BACKEND_URL,
      host: process.env.NUXT_PUBLIC_HOST,
      url: process.env.NUXT_PUBLIC_URL,
      keycloak: {
        url: 'http://localhost:8080',
        realm: 'shop-admin',
        clientId: 'shop-admin-client',
      },
    },
  },

  i18n: {
    vueI18n: './config/i18n.config.ts',
  },
  imports: {
    autoImport: true,
  },
  css: ['~/assets/styles/main.scss'],
  quasar: {
    plugins: ['Notify', 'Loading'],
    config: {
      notify: {},
      loading: {},
    },
  },
  ssr: false,
  devtools: { enabled: false },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.ico',
        },
      ],
    },
  },
  srcDir: 'client',
  devServer: {
    port: Number(process.env.NUXT_PUBLIC_PORT),
    host: process.env.NUXT_PUBLIC_HOST,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import '@/assets/styles/abstracts/variables/index.scss';
          @import '@/assets/styles/abstracts/mixins/index.scss';
        `,
          quietDeps: true,
        },
      },
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 24678,
        clientPort: 80,
      },
    },
  },

  compatibilityDate: '2024-11-01',
});
