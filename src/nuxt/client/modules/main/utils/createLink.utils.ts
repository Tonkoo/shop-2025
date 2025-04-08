export function createLink(
  parentSection: string,
  childSection?: string,
  product?: string
) {
  const parts = ['/catalog', parentSection, childSection, product]
    .filter(Boolean)
    .join('/');

  return parts;
}
