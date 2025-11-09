## ZION Web v3.3

Matrix-inspirovaná dokumentace pro **ZION TerraNova TestNet 2.8.5**. Tato verze navazuje na předchozí iterace (v3.x), sjednocuje matrix UI, dynamické pozadí a strukturu dokumentace (MDX/Markdown) do čisté základny připravené pro obsahovou migraci.

### Tech stack

- Next.js 16 (App Router, React 19, React Compiler)
- Tailwind CSS 4 + `@tailwindcss/typography`
- MDX (`@next/mdx`) a komponentový layout pro dokumentaci
- Framer Motion, `@react-three/fiber`, `three` pro efektní pozadí

### Skripty

```bash
npm run dev     # lokální vývoj na http://localhost:3000
npm run build   # produkční build
npm run start   # spuštění buildu
npm run lint    # ESLint kontrola
```

### Struktura

- `src/app/page.tsx` – hero stránka s ovládáním pozadí (`ThemePanel`).
- `src/app/docs/**` – MDX stránky dokumentace (placeholdery pro migraci).
- `src/components/` – UI prvky (Navbar, efekty, docs layout).
- `content/` – prostor pro sync legacy markdownů (zatím prázdné).

### Další kroky

1. Importovat reálný obsah z `Zion-TestNet2.8.5/docs` a `content/whitepaper`.
2. Doplnit vyhledávání v dokumentaci (např. Algolia DocSearch nebo lokální index).
3. Otestovat build (`npm run build`) a SSR režim po doplnění dat.
4. Připravit deployment pipeline (rsync / PM2 nebo Vercel build).

> Poznámka: Stávající MDX stránky obsahují placeholder texty, které je potřeba nahradit migrací z legacy repozitářů.
