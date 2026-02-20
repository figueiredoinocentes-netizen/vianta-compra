
## Revisão tipográfica e de espaçamentos — Sistema unificado com Plus Jakarta Sans

### Diagnóstico atual

O problema de inconsistência vem de 3 fontes misturadas sem hierarquia clara:

- `font-serif` (Playfair Display) no H1 da HeroSection
- `font-extrabold` sem família definida em vários h2/h3 → cai para Inter por defeito
- `font-bold` nos cards e advantages sem distinção de peso real
- Espaçamentos ad-hoc: `mb-2`, `mb-3`, `mb-6`, `mb-8` sem escala consistente
- Nenhuma `letter-spacing` sistematizada

---

### Sistema tipográfico proposto

| Nível | Font | Peso | Letter-spacing | Uso |
|---|---|---|---|---|
| H1 | Plus Jakarta Sans | 700 | `tracking-tight` | Título hero |
| H2 | Plus Jakarta Sans | 600 | `tracking-tight` | Secção Advantages |
| H3 | Plus Jakarta Sans | 600 | normal | Títulos nos cards e bottom sheet |
| Labels ALL CAPS | Plus Jakarta Sans | 600 | `tracking-widest` | "por semana", "Ano", "Caução" |
| Body | Inter | 400 | normal | Parágrafos e descrições |
| Body semibold | Inter | 500 | normal | Valores (preço, specs) |

---

### Alterações técnicas

#### 1. `index.html` — Carregar Plus Jakarta Sans via Google Fonts

Adicionar no `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

#### 2. `src/index.css` — Definir as fontes no sistema

```css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Utilitário para headings */
h1, h2, h3 {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

Adicionar no `tailwind.config.ts` a família de fontes:

```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
},
```

Assim pode usar `font-heading` nas classes Tailwind.

---

#### 3. `HeroSection.tsx` — H1 com peso e tracking corretos

```tsx
// Antes
<h1 className="text-3xl font-extrabold text-primary-foreground leading-tight mb-2 text-center font-serif">

// Depois
<h1 className="text-3xl font-bold text-primary-foreground leading-tight mb-2 text-center font-heading tracking-tight">
```

Subtítulo:
```tsx
// Antes
<p className="text-primary-foreground/70 text-sm text-center">

// Depois — ligeiro aumento de espaçamento inferior
<p className="text-primary-foreground/70 text-sm text-center mt-1">
```

---

#### 4. `AdvantagesSection.tsx` — H2 e H3 com nova família

```tsx
// H2 — antes
<h2 className="text-2xl font-extrabold text-foreground text-center mb-2 leading-tight">

// H2 — depois
<h2 className="text-2xl font-semibold text-foreground text-center mb-2 leading-tight font-heading tracking-tight">

// H3 nos cards — antes
<h3 className="font-bold text-foreground text-sm mb-1">

// H3 nos cards — depois
<h3 className="font-semibold text-foreground text-sm mb-1 font-heading">
```

---

#### 5. `VehicleCard.tsx` — Hierarquia clara modelo / preço / labels

```tsx
// Modelo — antes
<h3 className="font-bold text-foreground text-base leading-tight">

// Modelo — depois
<h3 className="font-semibold text-foreground text-base leading-tight font-heading">

// "por semana" label — ALL CAPS com tracking
// Antes
<p className="text-xs text-muted-foreground">por semana</p>

// Depois
<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">por semana</p>
```

---

#### 6. `VehicleBottomSheet.tsx` — H2 do modelo e labels dos detalhes

```tsx
// H2 modelo — antes
<h2 className="text-xl font-extrabold text-foreground">

// H2 modelo — depois
<h2 className="text-xl font-semibold text-foreground font-heading tracking-tight">

// Labels nos cards de detalhes ("Ano", "Caução", etc.) — antes
<p className="text-xs text-muted-foreground">Ano</p>

// Depois — ALL CAPS com tracking
<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">Ano</p>

// "por semana" — mesmo tratamento
<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">por semana</p>
```

---

### Resumo dos ficheiros alterados

| Ficheiro | Alteração |
|---|---|
| `index.html` | Adicionar `<link>` Google Fonts (Plus Jakarta Sans + Inter) |
| `tailwind.config.ts` | Adicionar `fontFamily: { heading: [...] }` |
| `src/index.css` | Garantir Inter no body; headings herdam da config |
| `src/components/vianta/HeroSection.tsx` | `font-heading tracking-tight` no H1 |
| `src/components/vianta/AdvantagesSection.tsx` | `font-heading` em H2 e H3 |
| `src/components/vianta/VehicleCard.tsx` | `font-heading` no modelo; ALL CAPS tracking nos labels |
| `src/components/vianta/VehicleBottomSheet.tsx` | `font-heading` no H2; ALL CAPS tracking nos labels de detalhe |
