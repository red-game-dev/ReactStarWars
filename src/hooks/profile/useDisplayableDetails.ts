import { MultiCategoryDetails } from "@api/endpoints/profile";

export const useDisplayableDetails = (viewableCategories: string[], currentProfile: MultiCategoryDetails) => {
  return Object.keys(currentProfile)
    .filter((key: string) => ![
      ...viewableCategories,
      'homeworld',
      'url',
      'name'
    ].includes(key))
    .reduce((previous: any, currentValue) => {
      previous[currentValue] = currentProfile[currentValue as keyof MultiCategoryDetails];
  
      return previous;
    }, {} as unknown as { [x: string]: string[] }) as Partial<MultiCategoryDetails>; 
}