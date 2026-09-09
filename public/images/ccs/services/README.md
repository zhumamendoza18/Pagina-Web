# Fotografías de soluciones — convención de álbumes

Ruta de cada álbum:

```
public/images/ccs/services/<familia>/<subtema>/
```

`<familia>` y `<subtema>` son los **slugs** definidos en `data/solutions.ts`
(p. ej. `abrillantado-de-concreto/abrillantado/`).

## Añadir la portada Antes / Después

1. Coloca el archivo compuesto (una sola imagen con ANTES | DESPUÉS lado a
   lado) en la carpeta del subtema, por ejemplo:
   `abrillantado-de-concreto/abrillantado/cover.jpg`
2. En `data/solutions.ts`, en ese subtopic, añade:

```ts
coverImage: "/images/ccs/services/abrillantado-de-concreto/abrillantado/cover.jpg",
```

Si no hay `coverImage`, se usa la primera imagen de `gallery` con `src`, y si
tampoco hay, se muestra el placeholder neutro (nunca un 404).

## Añadir fotos al álbum

En el mismo subtopic de `data/solutions.ts`:

```ts
gallery: [
  { src: "/images/ccs/services/abrillantado-de-concreto/abrillantado/cover.jpg",       alt: { es: "Antes y después", en: "Before and after" }, stage: "before-after" },
  { src: "/images/ccs/services/abrillantado-de-concreto/abrillantado/proceso-01.jpg",  alt: { es: "Preparación",     en: "Surface prep" },       stage: "prep" },
  { src: "/images/ccs/services/abrillantado-de-concreto/abrillantado/proceso-02.jpg",  alt: { es: "Proceso",         en: "Process" },            stage: "process" },
  { src: "/images/ccs/services/abrillantado-de-concreto/abrillantado/final-01.jpg",    alt: { es: "Resultado final", en: "Final result" },       stage: "final" },
],
```

- El **orden** es el del array (no el nombre de archivo). La primera entrada es
  la portada / Antes-Después.
- La cantidad es libre: cada subtema puede tener las que necesite.
- `stage` es solo una etiqueta opcional (`before-after`, `initial`, `prep`,
  `process`, `application`, `repair`, `progress`, `final`).
- Debajo de la portada se muestran hasta 4 miniaturas **solo** cuando hay fotos
  reales. "Ver proceso →" y el clic en la portada abren el lightbox con ese
  álbum.

## Reglas

- Solo fotografías reales y autorizadas de CCS. Sin stock, sin descargas, sin
  imágenes generadas.
- Formato recomendado: `.webp` / `.avif` para fotos; nombra los archivos según
  su etapa.
- No borres los `.gitkeep` mientras la carpeta esté vacía.
