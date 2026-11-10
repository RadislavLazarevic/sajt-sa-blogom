# Radislav — blog

Lični blog napravljen sa Next.js-om. Nema baze podataka: svaki post je jedan Markdown (MDX) fajl.

## Pokretanje

```bash
npm run dev     # http://localhost:3000
npm run build   # produkcijski build (i provera tipova)
```

## Kako dodati novi post

1. Napravi fajl `src/content/posts/naziv-posta.mdx`. Naziv fajla postaje adresa posta: `/blog/naziv-posta`.
2. Na vrh fajla dodaj podatke o postu, a ispod piši tekst u Markdown-u:

```mdx
---
title: "Naslov posta"
description: "Kratak opis koji se vidi u listi i na društvenim mrežama"
date: "2026-11-10"
draft: false
---

Tekst posta...
```

- `draft: true` sakriva post sa sajta, iz RSS-a i iz sitemap-a.
- Postovi su sortirani po datumu (`date`), od najnovijeg.

## Gde je šta

- `src/content/posts/`: blog postovi
- `src/content/o-meni.mdx`: tekst stranice „O meni“
- `src/lib/site.ts`: ime sajta, opis i adresa (pri objavljivanju podesi `NEXT_PUBLIC_SITE_URL`)
