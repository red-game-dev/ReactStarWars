import { QueryClient } from '@tanstack/react-query';

import { isApiError }from '../utils/api'

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
