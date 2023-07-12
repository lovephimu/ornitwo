export function capitalizeFirstLetterOnly(str: string | null) {
  if (str !== null)
    return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
}
