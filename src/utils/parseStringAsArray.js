export default function parseStringArray(arrayAsString) {
  return arrayAsString.split(',').map(tech => tech.trim());
}
