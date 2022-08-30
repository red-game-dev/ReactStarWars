import { createApiFetcher } from 'axios-multi-api';

const api = createApiFetcher({
    apiUrl: 'https://swapi.dev/api',
    strategy: 'reject',
    apiEndpoints: {
      getPosts: {
        url: '/posts/:subject',
      },
    }
});

export default api;
