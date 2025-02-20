export function prepareData(data: any, exclude: string[]) {
  const result = {};
  for (const key in data) {
    if (data.hasOwnProperty(key) && !exclude.includes(key)) {
      const newKey = toSnakeCase(key);
      result[newKey] = data[key];
    }
  }
  return result;
}

function toSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
