import { useQuery } from '@tanstack/react-query';
import { getSearch, SearchCategory } from "@api/endpoints/search"

export type UseSearchParams = {
  category?: SearchCategory
  searchValue: string
  canRefetch?: boolean
}

interface UseSearchResponse<Item> {
  isLoading?: boolean
  isFetching?: boolean
  isError?: boolean
  data?: Item[]
  error?: unknown
  remove?: () => void,
}

export const useSearch = <Item>({ category, searchValue, canRefetch }: UseSearchParams): UseSearchResponse<Item> => {
  const { 
    isLoading: isSearchLoading, 
    data: SearchResponse, 
    error,
    isFetching, 
    remove,
  } = useQuery(['searchCategory', category], () => getSearch<Item>({ category, searchValue }), {
    initialData: [],
    initialDataUpdatedAt: Date.now(),
    enabled: Boolean(category && searchValue) || canRefetch,
    refetchOnReconnect: true,
    cacheTime: canRefetch ? 0 : 5 * 60 * 1000,
  })

  if (isSearchLoading || isFetching) {
    return { 
      isLoading: true, 
    }
  }

  if (!SearchResponse) {
    return { 
      isError: true, 
      error, 
      remove,
    }
  }

  return {
    isLoading: false,
    data: SearchResponse,
    remove,
  }
}