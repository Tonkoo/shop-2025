export function camelCaseConverter<T extends object>(data: T | T[]): T | T[] {
  if (Array.isArray(data)) {
    return data.map((item) => camelCaseConverter(item) as T);
  }

  const result = Object.keys(data).reduce(
    (result, key) => {
      const newKey = toCamelCase(key);
      result[newKey] = data[key as keyof T];
      return result;
    },
    {} as Record<string, any>,
  );

  return result as T;
}

function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, (firstLetter) => firstLetter.toLowerCase());
}
