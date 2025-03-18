import ru from '../client/langs/ru';

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: {
    ru,
  },
  preload: import.meta.server,
  debug: import.meta.dev,
  locales: [
    {
      code: 'ru',
      iso: 'ru-ru',
    },
  ],
  datetimeFormats: {
    ru: {
      onlyDate: {
        day: 'numeric',
        month: 'long',
        weekday: 'long',
      },
    },
  },
  pluralRules: {
    /**
     * @param choice {number} индекс выбора,
     * переданный в $t: `$t('path.to.rule', {count: choice})`
     * @param choicesLength {number} общее количество доступных вариантов
     *
     * либо 4 элемента: 0 | Не(от 11 до 19) и (заканчивается на 1) | Не(от 11 до 19) и (заканчивается от 2 до 4) | все остальные
     * либо 3 элемента: 0 | Не(от 11 до 19) и (заканчивается на 1) | все остальные
     */
    ru: function customRule(choice, choicesLength) {
      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }
      return choicesLength < 4 ? 2 : 3;
    },
  },
}));
