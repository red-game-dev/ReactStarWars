export const useGetProfileEpisodesIds = (films: string[] = []) => films.map((item) => item.match(/\d+/))