import { QueryClient } from '@tanstack/react-query';

import { isApiError }from '@utils/api'

/**
 * @documentation https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown) => {
        if (isApiError(error)) {
          if (error.response?.status === 404) {
            return false;
          }
        }

        if (failureCount >= 3) {
          return false;
        }

        return true;
      }
    }
  }
});

export default queryClient;
