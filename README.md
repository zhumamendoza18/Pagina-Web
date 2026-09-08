# Concrete Coatings Solutions — sitio web

Sitio corporativo bilingüe (ES / EN) para **Concrete Coatings Solutions**
(_Soluciones para el Recubrimiento del Concreto S. de R.L. de C.V._).

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (tokens en `app/globals.css`)
- i18n propio basado en diccionarios, rutas `/es` y `/en`

## Scripts

| Comando             | Acción                          |
| ------------------- | ------------------------------- |
| `npm run dev`       | Servidor de desarrollo          |
| `npm run build`     | Build de producción             |
| `npm run start`     | Sirve el build                  |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | `tsc --noEmit`                  |

## Estructura

```
app/[locale]/         Rutas por idioma (layout, home, 404)
proxy.ts              Redirige "/" y rutas sin prefijo a /es o /en
components/
  layout/             Header, Footer, navegación, selector de idioma
  ui/                 Piezas reutilizables (Container, Section, Button, Logo)
  home/ services/ projects/   (vacías — se llenan en fases siguientes)
content/es/  content/en/      Diccionarios (misma forma, ver content/types.ts)
data/                Catálogos estructurales (servicios, industrias, proyectos,
                     clientes, marcas) — sin textos, sin datos inventados
config/site.ts       Configuración central: nombre, razón social, tagline,
                     año (2009), contacto (vacío), redes (vacías), flags
lib/                 i18n, diccionarios, helpers de contacto, navegación
public/images/ccs/   Fotografías y logos reales (ver README dentro)
```

## Reglas de contenido

- **No inventar datos.** Teléfono, WhatsApp, email, dirección y redes están
  vacíos en `config/site.ts` hasta que CCS los proporcione. Los componentes
  no generan enlaces falsos: si no hay número de WhatsApp, no hay botón.
- Clientes y marcas están preparados estructuralmente pero ocultos mediante
  `site.flags.showClients` / `site.flags.showBrands` (ambos `false`).
- Las imágenes reales van en `public/images/ccs/`. Sin foto → placeholder neutro.

## Idiomas

Todo el contenido visible proviene de `content/es` o `content/en`. Los
componentes reciben las cadenas ya traducidas por props; no se duplican.
