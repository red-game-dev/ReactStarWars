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

/**
 * useSearch is a hook that handles the api request to get the related search result if any
 * @param {Object} search A new instance of searching request
 * @param {string=} category The categroy to search with
 * @param {string} searchValue The value to be searched
 * @param {boolean=} canRefetch If this value should be forcefully refetched & clear cache
 * @returns {UseSearchResponse<Item>} The result fo this request
 */
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