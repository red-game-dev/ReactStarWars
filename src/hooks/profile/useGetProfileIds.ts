export const useGetProfileIds = (endpointsRelated: string[]): number[] => {
  return endpointsRelated.map((endpoint: string) => {
    const [, currentId] = endpoint.replace('https://swapi.dev/api', '').split('/').filter((item) => item);

    return parseInt(currentId);
  })
}