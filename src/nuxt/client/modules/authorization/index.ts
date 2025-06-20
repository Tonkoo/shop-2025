import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit';
export default defineNuxtModule({
  meta: {
    name: 'authorization-module',
    configKey: 'authorization-module',
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
    console.log('Successfully added module Authorization');
  },
});
