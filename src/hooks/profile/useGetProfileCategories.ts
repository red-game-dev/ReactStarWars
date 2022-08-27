export const useGetProfileCategories = (endpointsRelated: string[]): string => {
  const [first] = endpointsRelated;

  const [category] = first.replace('https://swapi.dev/api', '').split('/').filter((item) => item);

  return category;
}