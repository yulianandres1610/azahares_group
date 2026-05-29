/**
 * Concatena clases CSS condicionales. Misma firma que `clsx`/`cn` del
 * frontend operativo para mantener identidad de código portado.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
