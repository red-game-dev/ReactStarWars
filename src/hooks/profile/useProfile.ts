import { useQuery } from '@tanstack/react-query';
import { SearchCategory } from "@api/endpoints/search"
import { getProfiles } from "@api/endpoints/profile"

export type UseProfileParams = {
  category: SearchCategory
  profileId: number
  subIds: number[]
}

interface UseProfileResponse<Item> {
  isLoading?: boolean
  isFetching?: boolean
  isError?: boolean
  data: Item[]
  error?: unknown
  remove?: () => void,
}

/**
 * useSearch is a hook that handles the api request to get the related search result if any
 * @param {string=} category The categroy to search with
 * @param {string} profileId The profile id this is related to
 * @param {number[]} subIds The sub ids related to the profile
 * @returns {UseSearchResponse<Item>} The result fo this request
 */
export const useProfile = <Item>({ category, profileId, subIds }: UseProfileParams): UseProfileResponse<Item> => {
  const { 
    isLoading: isProfileLoading, 
    data: ProfileResponse, 
    error,
    isFetching, 
    remove,
  } = useQuery([`${category}-${profileId}`], () => getProfiles<Item>({ category, ids: subIds }), {
    initialData: [],
    initialDataUpdatedAt: Date.now(),
    enabled: Boolean(category && profileId && subIds.length),
    refetchOnReconnect: true,
  })

  if (isProfileLoading || isFetching) {
    return { 
      isLoading: true, 
      data: [] as Item[],
    }
  }

  if (!ProfileResponse) {
    return { 
      isError: true, 
      error, 
      remove,
      data: [] as Item[],
    }
  }

  return {
    isLoading: false,
    data: ProfileResponse,
    remove,
  }
}