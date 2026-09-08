# CCS image library

All real photography and brand assets for Concrete Coatings Solutions live here.
Until a real asset exists, components render a neutral placeholder that keeps the
layout proportions — **do not** drop in stock photos as if they were CCS work.

## Folders

| Folder        | Use                                                        |
| ------------- | ---------------------------------------------------------- |
| `hero/`       | Large hero / full-bleed background images                 |
| `services/`   | One image per solution family (see `data/solutions.ts` `slug`) |
| `industries/` | One image per industry (see `data/industries.ts` `slug`)  |
| `projects/`   | Project covers and galleries (see `data/projects.ts`)     |
| `company/`    | Logo files + "about / team / facility" photos             |
| `clients/`    | Client logos — stays hidden until `site.flags.showClients` |
| `brands/`     | Brand / manufacturer logos — hidden until `site.flags.showBrands` |

## Conventions

- Prefer `.webp` (or `.avif`) for photos; `.svg` for logos.
- Name files after the related `slug`, e.g. `services/pisos-y-recubrimientos.webp`.
- Reference a file from data by its name only (the folder is implied by the data set).
- Wire the filename into the matching `image` / `cover` field; an empty string
  means "no asset yet" and triggers the placeholder.
