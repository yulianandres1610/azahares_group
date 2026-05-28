/**
 * Variables públicas del frontend corporativo. NEXT_PUBLIC_API_URL
 * apunta al backend Azahares — reutilizamos los endpoints públicos de
 * tracking sin duplicar lógica.
 */
export const env = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ?? "https://api.azaharesfuel.com",
  loginUrl:
    process.env.NEXT_PUBLIC_LOGIN_URL ?? "https://www.azaharesfuel.com/login",
} as const;
