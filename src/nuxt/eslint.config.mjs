import { createConfigForNuxt } from '@nuxt/eslint-config'
import prettierConfig from 'eslint-config-prettier'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
  extends: ['plugin:prettier/recommended', prettierConfig],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/max-attributes-per-line': 'off',
  },
})
