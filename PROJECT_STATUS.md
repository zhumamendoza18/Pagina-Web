# Estado del proyecto — Concrete Coatings Solutions

_Última auditoría: Fase 15._
Stack: Next.js 16.3.4 · App Router · TypeScript (strict) · Tailwind CSS v4 · i18n propio (ES/EN).

`npm run build` · `npm run lint` · `npm run typecheck` → **los tres en verde**.

---

## 1. Resultado de la auditoría (15 puntos)

| # | Área | Estado |
|---|------|--------|
| 1 | TypeScript | ✅ `tsc --noEmit` sin errores (strict). |
| 2 | Compilación | ✅ `next build` OK. Rutas generadas: `/es`, `/en`, `/es|/en/opengraph-image`, `/icon.svg`, `/robots.txt`, `/sitemap.xml`. `eslint` sin errores ni warnings. |
| 3 | Consola | ✅ Sin errores ni warnings de hidratación en desarrollo. Sin APIs deprecadas (se migró `middleware` → `proxy`). |
| 4 | Enlaces rotos | ✅ Ningún `href` malformado. ⚠️ 7 rutas internas **aún no construidas** (§4) devuelven 404 por diseño. Anclas `#cotizacion`, `#mision-vision-valores`, `#top` funcionan. |
| 5 | Responsive | ✅ Auditado 375 / 430 / 768 / 1024 / 1440 / 1920. Sin overflow horizontal (`body { overflow-x: clip }`), nav → hamburguesa por debajo de 1280 px, objetivos táctiles ≥ 44 px, inputs a 16 px (sin zoom en iOS). |
| 6 | Accesibilidad | ✅ con **1 corrección aplicada en esta auditoría** (§6). HTML semántico, `lang`, skip link, `focus-visible` global, foco atrapado en modal y menú, `inert` en el drawer cerrado. |
| 7 | Navegación ES/EN | ✅ `/` redirige por `Accept-Language`; el selector conserva la ruta; todo el texto visible sale de `content/es` \| `content/en`; `hreflang` + `x-default`. |
| 8 | Imágenes | ✅ 0 `<img>` reales — todas son `Placeholder` (SVG neutro). Toda la fotografía irá por `next/image` (`fill`, `sizes`, `priority` selectivo, formatos AVIF/WebP). Sin imágenes de internet. |
| 9 | Performance | ✅ SSG de `/es` y `/en`; sin librerías de animación/carrusel; fuente self-hosted (`next/font`, swap); JS de cliente en islas pequeñas. ⏳ Falta medir Lighthouse con imágenes reales. |
| 10 | SEO | ✅ Fase 14 (§“SEO” más abajo). ⏳ Falta `NEXT_PUBLIC_SITE_URL`, favicon/logo real y datos de negocio local. |
| 11 | Formulario | ✅ Frontend con validación accesible. ❌ **Sin backend** — nunca simula envío (§9). |
| 12 | Navegación por teclado | ✅ Skip link, orden de tabulación coherente, trampa de foco + `Esc` + restauración en modal y drawer, carruseles focusables. Sin trampas. |
| 13 | Feature flags | ✅ `showClients` y `showBrands` en `false` → esas secciones no renderizan nada (verificado). `showProjects` en `true` → sección “Nuestro Trabajo” visible con placeholders. |
| 14 | Datos faltantes | ⏳ Contacto, redes, clientes, marcas, proyectos e imágenes: todos vacíos a propósito, con degradación elegante (§3–§8). |
| 15 | Componentes sin usar | ✅ Ninguno. 34 componentes + 6 `data/` + 5 `lib/` + diccionarios en uso. `data/services.ts` (placeholder) fue sustituido por `data/solutions.ts`. |

### 6. Corrección de accesibilidad aplicada

El acento cian de marca (`#0fa9dc`) sobre fondos **claros** daba un contraste de ~2.7:1 (por debajo de WCAG AA). Se cambió a `ccs-cyan-dark` (`#0b7fa6`, ≥ 4.5:1) en: kickers de sección, botón primario, botón de envío del formulario, subrayado de navegación activa, viñetas de la lista de valores, glifo de aviso del formulario y anillo de foco global. La cian brillante se conserva **solo sobre fondos oscuros** (donde cumple de sobra). Es un ajuste de tono, mismo color de familia; no cambia estructura ni diseño. La paleta sigue marcada como “calibrar al logotipo real”.

---

## 2. Qué está terminado

- **Infraestructura**: Next 16 + App Router + TS + Tailwind v4; i18n `/es` `/en` por diccionarios (los componentes reciben el texto ya traducido, no se duplican).
- **Layout**: Header sticky (logo, navegación, selector ES\|EN, botón “Solicitar cotización”, menú hamburguesa animado, con `inert`); Footer completo (marca, razón social, 7 enlaces incl. “Misión, Visión y Valores”, contacto desde config, redes solo si hay URL, selector ES\|EN, `© Concrete Coatings Solutions`, botón ↑); skip link.
- **Home** (una sola página, larga y visual, fondos alternados):
  1. Hero (foto a sangre + overlay + titular en 2 líneas + “Desde 2009” + mercados + CTAs)
  2. Nuestra Historia (50/50, chips no numéricos, CTA)
  3. Nuestras Soluciones (4 tarjetas fotográficas grandes + “Ver todos los servicios”)
  4. Industrias que atendemos (4 tarjetas casi-foto-completa)
  5. Nuestro Trabajo (galería editorial tipo mosaico + filtro por categoría; placeholders, sin proyectos inventados)
  6. Aplicaciones especializadas (carrusel horizontal táctil de 9)
  7. Misión, Visión y Valores (3 tarjetas + **modal accesible**)
  8. Banda de conversión (foto + overlay azul marino + WhatsApp / Llamar / Solicitar cotización)
  9. Formulario de cotización (`#cotizacion`)
- **Componentes reutilizables**: `Section`, `Container`, `Button`, `Media`, `Placeholder`, `Modal`, `Reveal`, `Logo`, `SolutionIcon`, `IndustryIcon`, tarjetas y carruseles.
- **Estructuras de datos**: `data/solutions.ts` (6 categorías + subtemas), `data/industries.ts` (4 segmentos), `data/projects.ts` (tipo completo, array vacío), `data/clients.ts` / `data/brands.ts` (tipo + vacío + flags), `data/home.ts` (slots de imagen).
- **Animaciones discretas** (fade + slide de 8 px al hacer scroll, zoom ligero al hover, transición de menú) con respeto total a `prefers-reduced-motion`.
- **Responsive** 375–1920 auditado.
- **SEO técnico** completo (ver más abajo).
- **Accesibilidad**: semántica, teclado, foco, contraste AA (tras esta auditoría).

### SEO — hecho

`title` + `description` por idioma · `canonical` · `hreflang` (es / en / x-default) · Open Graph + Twitter Card · imagen OG generada por idioma con `next/og` · `sitemap.xml` (con alternates) · `robots.txt` · favicon (`app/icon.svg`, temporal) · JSON-LD `Organization` (sin dirección/teléfono/área) · 404 con `noindex` · `next/image` con AVIF/WebP.

---

## 3. Qué falta (trabajo pendiente de desarrollo)

- **7 rutas internas** (todas enlazadas desde la Home; hoy 404):
  - `/{es|en}/soluciones` — índice de soluciones
  - `/{es|en}/soluciones/{slug}` — 6 páginas de categoría: `abrillantado-de-concreto`, `recubrimientos-para-pisos`, `impermeabilizacion`, `recubrimientos-especializados`, `reparacion-de-concreto`, `mantenimiento-de-sistemas-existentes`
  - `/{es|en}/industrias` — índice de industrias
  - `/{es|en}/industrias/{slug}` — 4 páginas: `industrial`, `comercial`, `residencial`, `aplicaciones-especializadas`
  - `/{es|en}/proyectos` — galería completa de proyectos
  - `/{es|en}/nosotros` — página “Nosotros”
  - `/{es|en}/contacto` — página de contacto
  - Cada una: **`<h1>` único**, `alternates` propio con `alternatesFor(locale, ruta)`, y alta en `ROUTES` de `app/sitemap.ts`.
- **Backend del formulario** de cotización (§9).
- **Secciones Clientes y Marcas**: ya construidas y ocultas; activar con datos reales (§6–§7).
- **Contenido largo** de soluciones/industrias/nosotros (acordeones, modales) al construir esas páginas.
- Calibración de la **paleta** a los colores exactos del logotipo (tokens en `app/globals.css`) y re-verificación de contraste.
- Revisión con CCS de la **traducción EN del tagline** (“Floor Sealing Experts”, provisional).

---

## 4. Datos que debe proporcionar el propietario

Editar `config/site.ts` → `site.contact` y `site.social`:

| Campo | Descripción | Estado |
|-------|-------------|--------|
| `contact.phone` | Teléfono público, formato internacional (`+52…`) | ❌ vacío |
| `contact.whatsapp` | Número de WhatsApp, solo dígitos con código de país (`52…`) | ❌ vacío |
| `contact.email` | Correo de contacto | ❌ vacío |
| `contact.address` | Dirección (para SEO local futuro) | ❌ vacío |
| `social.facebook` / `instagram` / `linkedin` / `youtube` / `tiktok` | URLs completas de perfil | ❌ vacías |

Mientras estén vacíos: no se genera ningún enlace falso — los botones de WhatsApp / Llamar aparecen **deshabilitados**, el footer muestra “Datos de contacto próximamente” y no se listan redes.

Otros datos:
- **Logotipo real** de CCS (SVG) → `public/images/ccs/company/` + conectar en `components/ui/Logo.tsx` (hoy es un wordmark de texto).
- **Favicon real** → sustituir `app/icon.svg` (hoy es una marca geométrica temporal, no el logo).
- **Colores exactos** del logotipo para calibrar los tokens `--color-ccs-*` en `app/globals.css`.
- **Dominio** de producción → variable `NEXT_PUBLIC_SITE_URL` (ver `.env.example`).
- Confirmación (o corrección) del **tagline en inglés**.

---

## 5. Imágenes que faltan

Carpeta base: `public/images/ccs/`. Sin foto real → se muestra un placeholder neutro que conserva la proporción. **No usar fotos de stock como si fueran trabajos de CCS.**

| Carpeta | Qué falta | Se conecta en |
|---------|-----------|---------------|
| `hero/` | 1 fotografía horizontal grande de piso industrial de concreto terminado | `data/home.ts` → `heroConfig.image` |
| `company/` | 1 foto para “Nuestra Historia” (equipo / obra); + logo real + fotos de la empresa | `data/home.ts` → `storyConfig.image` |
| `services/` | 1 foto por familia de solución (4 en Home + Reparación + Mantenimiento); 1 foto de aplicación de recubrimiento para la banda CTA; opcional: 1 por subtema del carrusel de Aplicaciones | `data/solutions.ts` (`image`, `subtopics[].image`), `data/home.ts` → `ctaConfig.image` |
| `industries/` | 1 foto por segmento: industrial, comercial, residencial, aplicaciones especializadas | `data/industries.ts` → `image` |
| `projects/` | Portadas, galerías y pares antes/después de proyectos reales | `data/projects.ts` |
| `clients/` | Logos de clientes (solo al activar la sección) | `data/clients.ts` → `logo` |
| `brands/` | Logos de marcas / proveedores / fabricantes (solo al activar la sección) | `data/brands.ts` → `logo` |

Recomendación: `.webp`/`.avif` para fotos, `.svg` para logos; nombrar cada archivo según el `slug` correspondiente.

Imagen Open Graph: ya se genera automáticamente (tarjeta de marca por idioma). Opcional sustituirla más adelante por una con fotografía real.

---

## 6. Clientes pendientes

`data/clients.ts` → array **vacío** a propósito. `site.flags.showClients = false`.

Cuando CCS confirme la lista:
1. Añadir cada cliente a `clients[]`: `name`, `logo` (archivo en `public/images/ccs/clients/`), y opcionalmente `url`, `industry`, `projectType`.
2. Poner `site.flags.showClients = true`.

La sección “Empresas que han confiado en nosotros” (carrusel horizontal de logos, táctil) ya está construida y aparecerá automáticamente. **No se ha inventado ninguna empresa.**

---

## 7. Marcas / proveedores pendientes

`data/brands.ts` → array **vacío** a propósito. `site.flags.showBrands = false`.

Cuando CCS confirme la lista:
1. Añadir cada marca a `brands[]`: `name`, `logo` (archivo en `public/images/ccs/brands/`), y opcionalmente `url`.
2. Poner `site.flags.showBrands = true`.

La sección “Tecnología y materiales” (mismo carrusel de logos) ya está construida. **No se ha inventado ninguna marca (ni Home Depot ni ninguna otra).**

---

## 8. Fotografías pendientes (resumen)

Todas las fotografías del sitio son placeholders. Se necesitan (mínimo para publicar con imagen real):
- Hero (1)
- Nuestra Historia (1)
- 4 familias de soluciones + Reparación + Mantenimiento (hasta 6)
- Banda de conversión / aplicación de recubrimiento (1)
- 4 segmentos de industria (4)
- Proyectos reales (portada + galería por proyecto)
- Opcional: 9 fotos para el carrusel de aplicaciones especializadas

Detalle y ubicación exacta en §5.

---

## 9. Backend del formulario — PENDIENTE

Estado actual: **frontend puro, sin conexión a servidor.**
- Valida en cliente (Nombre, Correo con formato, Mensaje obligatorios; resto opcional).
- **Nunca simula un envío exitoso.** Aviso permanente bajo el título + panel tras enviar (“Formulario listo, pero aún no se puede enviar”).
- Campo “Adjuntar fotografías”: marcado como “disponible próximamente”, sin input activo.

Para conectarlo:
1. Crear `app/api/quote/route.ts` (Route Handler POST) que valide en servidor (p. ej. con `zod`).
2. Enviar por correo (**Resend**, Postmark…) o a un CRM/webhook.
3. Sustituir el panel “no conectado” por confirmación real de envío + manejo de errores.
4. Añadir anti-spam (honeypot / rate-limit / captcha).
5. (Opcional) implementar la subida de fotografías.

---

## 10. Pasos necesarios antes de publicar

1. **Definir `NEXT_PUBLIC_SITE_URL`** con el dominio real (canonical, hreflang, OG, sitemap y robots se recalculan solos). Ver `.env.example`.
2. **Logo y favicon reales** → `public/images/ccs/company/` y `app/icon.svg`; conectar `components/ui/Logo.tsx`.
3. **Datos de contacto reales** en `config/site.ts` (teléfono, WhatsApp, correo, dirección, redes).
4. **Calibrar la paleta** a los colores exactos del logotipo (`app/globals.css`) y re-verificar contraste AA.
5. **Cargar fotografías reales** en `public/images/ccs/**` y enlazar los slots en `data/*`.
6. **Construir las 7 rutas internas** pendientes (H1 único, `alternatesFor`, alta en `ROUTES` del sitemap).
7. **Conectar el backend del formulario** (§9).
8. **Activar Clientes / Marcas** si hay datos confirmados (`showClients` / `showBrands`).
9. Revisar textos ES/EN con CCS (incluye tagline EN).
10. `npm run build` limpio + **auditoría Lighthouse / axe** con las imágenes reales.
11. Alta en **Google Search Console**: enviar `sitemap.xml`, revisar cobertura y hreflang.
12. Si se confirma dirección / área de servicio: elevar el JSON-LD de `Organization` a **`LocalBusiness`** (`address`, `telephone`, `areaServed`, `geo`, horarios) — ver nota en `lib/seo.ts`.
13. Configurar cabeceras de seguridad y caché en el hosting (Vercel u otro).
