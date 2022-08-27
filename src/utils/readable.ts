import { SearchCategory } from "@api/endpoints/search"

export const categoryToReadable = (category: string) => {
  switch (category) {
    case SearchCategory.PEOPLE:
      return 'Person'
    case SearchCategory.FILMS:
      return 'Movie'
    case SearchCategory.STARSHIPS:
      return 'Starship'
    case SearchCategory.VEHICLES:
      return 'Vehicle'
    default:
      return 'Unknown'
  }
}