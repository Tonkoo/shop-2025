import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'main-module',
    configKey: 'main-module',
    compatibility: {
      nuxt: '^3.11.1',
    },
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url);
    const widgetsPath = resolve('./widgets');
    const globalPath = resolve('./global');
    addImportsDir(globalPath);
    addComponentsDir({
      path: widgetsPath,
      global: true,
      pathPrefix: false,
    });
    console.log('Successfully added module Main');
  },
});
