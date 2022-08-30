
/**
 * Transform non captilized to captilized string
 * @param {string} text The text to be transformed into capitlized
 * @returns {string} The captilized string
 */
export const toCapitalize = (text: string) =>
  text.split(' ').map((word) =>`${word.charAt(0).toUpperCase()}${word.toLowerCase().slice(1)}`).join(' ')