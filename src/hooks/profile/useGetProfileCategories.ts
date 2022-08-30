export const useGetProfileCategories = (endpointsRelated: string[]): string => {
  const [first = ""] = endpointsRelated || [];

  if (!first) {
    return "";
  }

  const [category] = first.replace('https://swapi.dev/api', '').split('/').filter((item) => item);

  return category;
}