import { useQuery } from '@tanstack/react-query';
import { SearchCategory } from "@api/endpoints/search"
import { getProfile } from "@api/endpoints/profile"

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

export const useProfile = <Item>({ category, profileId, subIds }: UseProfileParams): UseProfileResponse<Item> => {
  const { 
    isLoading: isProfileLoading, 
    data: ProfileResponse, 
    error,
    isFetching, 
    remove,
  } = useQuery([`${category}-${profileId}`], () => getProfile<Item>({ category, ids: subIds }), {
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