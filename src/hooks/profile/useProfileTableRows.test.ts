import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import { useProfileTableRows } from '@hooks/profile/useProfileTableRows';

describe('[Hook] useProfileTableRows', () => {
  const excludedCategories = [SearchCategory.PEOPLE, SearchCategory.VEHICLES, SearchCategory.SPECIES, SearchCategory.PLANETS, SearchCategory.STARSHIPS];
  const currentProfiles: MultiCategoryDetails[] = [{
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
  }]

  it('Should return the result with specific fields only', () => {
    const result = useProfileTableRows(excludedCategories, currentProfiles);

    const [currentProfile = {} as MultiCategoryDetails] = currentProfiles;
    const { homeworld, url, species, vehicles, starships, ...others } = currentProfile;

    expect(JSON.stringify(result)).toBe(JSON.stringify([{
      ...others,
      key: 'Luke-Skywalker-0'
    }]));
  })

  it('Should have always the key present', () => {
    const result = useProfileTableRows(excludedCategories, currentProfiles);

    expect(result[0].key).toBe('Luke-Skywalker-0');
  })

  it('Should return an empty array if no profile provided', () => {
    const result = useProfileTableRows(excludedCategories, []);

    expect(JSON.stringify(result)).toBe(JSON.stringify([]));
  })
})