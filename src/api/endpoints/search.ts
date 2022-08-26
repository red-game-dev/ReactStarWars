import api from "@services/ApiService"

export enum SearchCategory {
  PEOPLE = 'people',
  PLANETS = 'planets',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles',
  SPECIES = 'species',
  FILMS = 'films',
  PILOTS = 'pilots',
  ALL = 'all',
}

export type SearchResponse<Item> = {
  readonly count: number
  readonly next: number
  readonly previous: number
  readonly results: Item[]
}

export type GetSearchParams = {
  category?: SearchCategory
  searchValue: string
}

export const getSearch = async <Item>({ category = SearchCategory.ALL, searchValue }: GetSearchParams) => {
  if (!searchValue) {
    return Promise.reject({
      message: 'Please enter a search term',
    })
  }

  if (category === SearchCategory.ALL) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const categories = Object.values(SearchCategory)
      .filter((category) => !([SearchCategory.ALL, SearchCategory.PILOTS, SearchCategory.FILMS, SearchCategory.SPECIES].includes(category)));
  
    return Promise.resolve((await Promise.all(
      categories.map((category) => api.get<SearchResponse<Item>>(`/${category}?search=${searchValue}`)
      .then(response => response.data.results)
      )
    )).sort(function (a, b) {
      return b.length - a.length;
    }).flat(1))
  }

  return api.get<SearchResponse<Item>>(`/${category}?search=${searchValue}`)
    .then(response => response.data.results)
} 