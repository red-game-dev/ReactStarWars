import { useGetProfileEpisodesIds } from '@hooks/profile/useGetProfileEpisodesIds';

describe('[Hook] useGetProfileEpisodesIds', () => {
  const relatedEndpoints = [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/"
  ]


  it('Should return with the profile category', () => {
    const result = useGetProfileEpisodesIds(relatedEndpoints);

    expect(JSON.stringify(result)).toBe(JSON.stringify([
      1,2,3,6
    ]));
  })

  it('Should not return the result different profile category', () => {
    const result = useGetProfileEpisodesIds(relatedEndpoints);

    expect(JSON.stringify(result)).not.toBe(JSON.stringify([
      1,2,3,5
    ]));
  })

  it('Should return empty array if nothing was given', () => {
    const result = useGetProfileEpisodesIds([]);

    expect(JSON.stringify(result)).toBe(JSON.stringify([]));
  })
})