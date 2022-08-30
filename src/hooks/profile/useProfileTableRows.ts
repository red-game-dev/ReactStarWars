import { MultiCategoryDetails } from "@api/endpoints/profile";

type UseProfileTableRowsStruct = (MultiCategoryDetails & {
  key: string
})[]

export const useProfileTableRows = (excludedCategories: string[], data: MultiCategoryDetails[], max?: number): UseProfileTableRowsStruct => {
  return data.map((currentProfile: MultiCategoryDetails) => Object.keys(currentProfile)
    .filter((key: string) => ![
      ...excludedCategories,
      'homeworld',
      'url',
      'characters',
    ].includes(key))
    
    .reduce((previous: any, currentValue) => {
      previous[currentValue] = currentProfile[currentValue as keyof MultiCategoryDetails];

      return previous;
    }, {} as unknown as { [x: string]: string[] }))
    .map((currentProfile: MultiCategoryDetails, index: number) => ({
      ...currentProfile,
      key: `${(currentProfile.name || currentProfile.title || '').split(' ').join('-')}-${index}`,
    }));
}