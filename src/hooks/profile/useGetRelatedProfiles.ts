import { MultiCategoryDetails } from "@api/endpoints/profile";

export const useGetRelatedProfiles = (viewableCategories: string[], currentProfile: MultiCategoryDetails) => {
  return ([...viewableCategories, 'homeworld'] as unknown as (keyof MultiCategoryDetails)[])
  .filter((item: keyof MultiCategoryDetails) => typeof currentProfile[item] === 'object' && ((currentProfile[item] || []) as string[]).length > 0)
  .reduce((previous, currentValue) => {

    if (!previous[currentValue]){
      previous[currentValue] = [];
    }

    if (typeof currentProfile[currentValue] === 'string') {
      previous[currentValue].push(...[currentProfile[currentValue] as string])
    } else if (typeof currentProfile[currentValue] === 'object') {
      previous[currentValue].push(...(currentProfile[currentValue] as string[] || []))
    }

    return previous;
  }, {} as any)
}