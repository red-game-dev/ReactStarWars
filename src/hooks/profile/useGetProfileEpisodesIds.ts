export const useGetProfileEpisodesIds = (films: string[] = []) => films
  .map((item) => item.match(/\d+/))
  .flat(2)
  .filter((item) => item)
  .map((num) => Number(num))