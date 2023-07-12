export function capitalizeFirstLetterOnly(str: string | null) {
  return str!.toLowerCase().charAt(0).toUpperCase() + str!.slice(1);
}
