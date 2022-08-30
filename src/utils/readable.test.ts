import { SearchCategory } from '@api/endpoints/search';
import { categoryToSingularHumanReadable } from '@utils/readable';

describe('[Util] Readable', () => {
  it('Should be "Unknown" on category ALL', () => {
      const result = categoryToSingularHumanReadable(SearchCategory.ALL);
      
      expect(result).toBe('Unknown');
  })

  it('Should be "Planet" on category PLANETS', () => {
      const result = categoryToSingularHumanReadable(SearchCategory.PLANETS);
      
      expect(result).toBe('Planet');
  })

  it('Should be "Vehicle" on category VEHICLES', () => {
      const result = categoryToSingularHumanReadable(SearchCategory.VEHICLES);
      
      expect(result).toBe('Vehicle');
  })
});