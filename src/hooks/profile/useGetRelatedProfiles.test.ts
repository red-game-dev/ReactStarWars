import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import { useGetRelatedProfiles } from '@hooks/profile/useGetRelatedProfiles';

describe('[Hook] useGetRelatedProfiles', () => {
  const viewableCategories = [SearchCategory.PEOPLE, SearchCategory.VEHICLES, SearchCategory.SPECIES, SearchCategory.PLANETS, SearchCategory.STARSHIPS];
  const currentProfile: MultiCategoryDetails = {
    name: "Luke Skywalker",
    height: 172,
    mass: 77,
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
    ],
    species: [],
    vehicles: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
    ],
    starships: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
    ],
    created: new Date("2014-12-09T13:50:51.644000Z"),
    edited: new Date("2014-12-20T21:17:56.891000Z"),
    url: "https://swapi.dev/api/people/1/"
  }

  it('Should return the result with specific fields only', () => {
    const result = useGetRelatedProfiles(viewableCategories, currentProfile);

    const { vehicles, starships } = currentProfile;

    expect(JSON.stringify(result)).toBe(JSON.stringify({
      vehicles,
      starships,
    }))
  });

  it('Should not return the result with specific fields', () => {
    const result = useGetRelatedProfiles(viewableCategories, currentProfile);

    const { vehicles, starships } = currentProfile;

    expect(JSON.stringify(result)).not.toBe(JSON.stringify({
      vehicles,
      starships,
      pilots: []
    }))
  });

  it('Should not return anything if profile object not passed', () => {
    const result = useGetRelatedProfiles(viewableCategories, {} as MultiCategoryDetails);

    expect(JSON.stringify(result)).toBe(JSON.stringify({}))
  });

  it('Should exclude the category if not provided in the list', () => {
    const result = useGetRelatedProfiles([SearchCategory.STARSHIPS], currentProfile);

    const { starships } = currentProfile;

    expect(JSON.stringify(result)).toBe(JSON.stringify({
      starships,
    }))
  });
})