import { useGetProfileCategories } from '@hooks/profile/useGetProfileCategories';

describe('[Hook] useGetProfileCategories', () => {
  const relatedEndpoints = [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/"
  ]


  it('Should return with the profile category', () => {
    const result = useGetProfileCategories(relatedEndpoints);

    expect(result).toBe('films');
  })

  it('Should not return the result different profile category', () => {
    const result = useGetProfileCategories(relatedEndpoints);

    expect(result).not.toBe('vehicles');
  })

  it('Should return empty undefined if nothing given', () => {
    const result = useGetProfileCategories([]);

    expect(result).toBe("");
  })
})