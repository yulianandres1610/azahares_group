/**
 * Variables públicas del frontend corporativo.
 *
 * Reutilizamos el endpoint público del backend Azahares (mismo que
 * azaharesfuel.com) — el tracking no duplica lógica.
 */
export const env = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ?? "https://api.azaharesfuel.com",
  loginUrl:
    process.env.NEXT_PUBLIC_LOGIN_URL ?? "https://www.azaharesfuel.com/login",
  /**
   * Token público de Mapbox para renderizar el mapa GPS del tracking.
   * Si está vacío, el panel del mapa muestra un fallback informativo
   * sin romper la página.
   */
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
} as const;
