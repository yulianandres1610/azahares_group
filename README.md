# Azahares Group · sitio corporativo

Sitio público para `azaharesgroup.com`. Next.js 16 + Tailwind 4 + Framer
Motion. Reutiliza el API público de tracking del backend Azahares.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4** (config inline en `globals.css`)
- **Framer Motion 12** para animaciones
- **lucide-react** para iconos

## Páginas

- `/` — Home con hero animado, servicios, stats
- `/servicios` — Detalle de las 4 verticales (combustible, alimentos,
  courier, logística general)
- `/tracking` — Búsqueda pública por CAT / orden / factura, llama al
  endpoint `GET /public/tracking/by-number?q=…` del backend Azahares
- `/contacto` — Form de cotización + canales de contacto

## Diseño

- Paleta navy oficial Azahares (#0d1b3d → #1d3a8a) + acentos amber
- Botones liquid glass (`.btn-glass-primary` / `.btn-glass-ghost`)
- Cards translúcidas con backdrop-blur (`.glass-panel` /
  `.glass-card-light`)
- Hero con orbes flotantes animados
- Mobile-first, drawer nav debajo de `md:`

## Setup

```sh
npm install
cp .env.example .env.local
npm run dev      # arranca en puerto 3010
npm run build    # build prod
npm run typecheck
```

## Deploy a Vercel

1. Importar este directorio como proyecto nuevo en Vercel
2. Setear env vars:
   - `NEXT_PUBLIC_API_URL=https://api.azaharesfuel.com`
   - `NEXT_PUBLIC_LOGIN_URL=https://www.azaharesfuel.com/login`
3. Apuntar `azaharesgroup.com` al deploy

## Backend dependency

El tracking público depende del endpoint:

```
GET https://api.azaharesfuel.com/public/tracking/by-number?q=<código>
```

Mismo que ya consume el frontend operativo en `/tracking/[id]`.
Si en el futuro el shape cambia, ajustar en `src/lib/tracking.ts` sin
tocar la UI.
