import { toCapitalize } from '@utils/text';

describe('[Util] Text', () => {
  it('Should one word be capitalized', () => {
      const str = 'test';

      const result = toCapitalize(str);
      
      expect(result).toBe('Test');
  })

  it('Should multiple word be capitalized', () => {
      const str = 'test string to be capitalized';

      const result = toCapitalize(str);
      
      expect(result).toBe('Test String To Be Capitalized');
  })

  it('Should not be fully uppercase', () => {
      const str = 'test string to be capitalized';

      const result = toCapitalize(str);
      
      expect(result).not.toBe(str.toUpperCase());
  })

  it('Should not be fully lowercase', () => {
      const str = 'test string to be capitalized';

      const result = toCapitalize(str);
      
      expect(result).not.toBe(str.toLowerCase());
  })
});