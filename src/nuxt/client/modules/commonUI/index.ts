import {
  addComponentsDir,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit';
import type { ModuleOptions } from 'rollup';
import type { IconsType } from '~/modules/commonUI/runtime/components/svg/types/IconsType';

export type { IconsType };

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'common-ui-module',
    configKey: 'common-ui-module',
    compatibility: {
      nuxt: '^3.11.1',
    },
  },
  async setup(options, nuxt) {
    // Module: Transpile the runtime and vuetify package
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve('./runtime');
    nuxt.options.imports.autoImport = true;
    nuxt.options.components = true;

    nuxt.options.appConfig.commonUi = options;
    await installModule(
      'nuxt-svg-icon-sprite',
      {
        sprites: {
          default: {
            importPatterns: [resolve('assets/icon/**/*.svg')],
          },
          // special: {
          //   importPatterns: [resolve(runtimeDir, 'assets/special/**/*.svg')],
          // },
          // linning: {
          //   importPatterns: [resolve(runtimeDir, 'assets/linning/**/*.svg')],
          // },
        },
      },
      nuxt
    );

    addComponentsDir({
      path: resolve('./runtime/components'),
      global: true,
      pathPrefix: false,
    });

    nuxt.options.css = [
      resolve('./assets/scss/index.scss'),
      ...nuxt.options.css,
    ];

    const projectSccAdditionalData =
      nuxt.options.vite?.css?.preprocessorOptions?.scss?.additionalData || '';
    const currentSccAdditionalData = `
            @import "${resolve('./assets/scss/colors.scss')}";
            @import "${resolve('./assets/scss/fonts.scss')}";
    `;

    nuxt.options.vite = {
      ...nuxt.options.vite,
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: currentSccAdditionalData + projectSccAdditionalData,
          },
        },
      },
    };

    // nuxt.options.vite = {
    //   ...nuxt.options.vite,
    //   css: {
    //     preprocessorOptions: {
    //       scss: {
    //         additionalData: `
    //         @import "${resolve('./assets/scss/colors.scss')}";
    //         @import "${resolve('./assets/scss/fonts.scss')}";
    //     `,
    //       },
    //     },
    //   },
    // };
    nuxt.options.typescript.typeCheck = true;

    console.log('Successfully added module Common Ui');
  },
});
