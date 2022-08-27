import { MultiCategoryDetails } from "@api/endpoints/profile";

type UseDisplayableDetailsStruct = (MultiCategoryDetails & {
  key: string
})

export const useDisplayableDetails = (viewableCategories: string[], currentProfile: MultiCategoryDetails): UseDisplayableDetailsStruct => {
  return Object.keys(currentProfile)
    .filter((key: string) => ![
      ...viewableCategories,
      'homeworld',
      'url',
      'characters',
      'name'
    ].includes(key))
    
    .reduce((previous: any, currentValue) => {
      previous[currentValue] = currentProfile[currentValue as keyof MultiCategoryDetails];

      return previous;
    }, {} as unknown as { [x: string]: string[] })
}