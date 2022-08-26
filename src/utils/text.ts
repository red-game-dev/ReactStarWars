export const toCapitalize = (text: string) =>
  text.split(' ').map((word) =>`${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')