import type { AxiosError } from "axios";

/**
 * Check if current error is related to API
 * @param {object} error Potentially unknown object error
 * @returns {boolean} If this is an error of Api
 */
export const isApiError = (error: unknown): error is AxiosError => 
  (error as AxiosError).isAxiosError !== undefined;