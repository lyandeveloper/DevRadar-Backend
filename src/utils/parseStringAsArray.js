export default function parseStringArray(arrayAsString) {
  if (typeof arrayAsString !== 'string') {
    throw new Error('array must to be a string');
  }
  return arrayAsString.split(',').map(tech => tech.trim());
}
