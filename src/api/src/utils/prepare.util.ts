export function prepareData<T extends object>(data: T, exclude: string[]) {
  return Object.keys(data).reduce(
    (result, key) => {
      if (!exclude.includes(key)) {
        const newKey = toSnakeCase(key);
        result[newKey] = data[key as keyof T];
      }
      return result;
    },
    {} as Record<string, any>,
  );
}

function toSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
