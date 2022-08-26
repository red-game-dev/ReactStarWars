import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://swapi.dev/api',
})

api.interceptors.request.use(
  (axiosConfig: AxiosRequestConfig) => {
    // TODO: This used to add a locale and/or authorization header

    return axiosConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => { 
    return response;
  },
  (error: AxiosError) => { 
    // TODO: This to handle refresh token error later on

    return Promise.reject(error)
  }
)

export default api;