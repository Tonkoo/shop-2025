/**
 * Возращает готовые объект для добавления или изменения записи в бд
 * @param data
 * @param exclude
 */
export function prepareData<T extends object>(data: T, exclude: string[]) {
  return Object.keys(data).reduce(
    (result, key) => {
      if (!exclude.includes(key)) {
        const newKey = toSnakeCase(key);
        const value = data[key as keyof T];
        if (
          typeof value === 'string' &&
          (value === 'true' || value === 'false')
        ) {
          result[newKey] = value === 'true';
        } else {
          result[newKey] = value;
        }
      }
      return result;
    },
    {} as Record<string, any>,
  );
}

/**
 * Форматирует параметры объекта к стилю snakeCase
 * @param str
 */
function toSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
