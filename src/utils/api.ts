import type { AxiosError } from "axios";

export const isApiError = (error: unknown): error is AxiosError => 
  (error as AxiosError).isAxiosError !== undefined;