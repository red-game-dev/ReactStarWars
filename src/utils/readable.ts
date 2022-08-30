import { SearchCategory } from "@api/endpoints/search"

/**
 * Get the category translated | This is not best way of doing it
 * @param {string} category The category to be translated
 * @returns {string} The category phrase translated
 */
export const categoryToSingularHumanReadable = (category: string) => {
  switch (category) {
    case SearchCategory.PEOPLE:
      return 'Person'
    case SearchCategory.FILMS:
      return 'Movie'
    case SearchCategory.STARSHIPS:
      return 'Starship'
    case SearchCategory.VEHICLES:
      return 'Vehicle'
    case SearchCategory.SPECIES:
      return 'Species'
    case SearchCategory.PILOTS:
      return 'Pilot'
    case SearchCategory.PLANETS:
      return 'Planet'
    default:
      return 'Unknown'
  }
}