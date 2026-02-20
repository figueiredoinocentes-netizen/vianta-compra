
## Esconder a barra de scroll do carrossel de viaturas

### Problema

O carousel usa a classe Tailwind `scrollbar-none`, que gera:
```css
.scrollbar-none { scrollbar-width: none; }
.scrollbar-none::-webkit-scrollbar { display: none; }
```

Isto devia funcionar — mas pode não estar a ser aplicado porque o `pb-2` no mesmo elemento está a criar espaço vertical onde a scrollbar aparece, e em alguns browsers (especialmente desktop ou Android Chrome) a scrollbar sobrepõe-se mesmo com `scrollbar-none`.

### Solução

Duas alterações simples:

**1. `src/index.css`** — Adicionar regra CSS global para garantir que funciona em todos os browsers (incluindo Firefox):

```css
/* Hide scrollbars globally where applied */
.scrollbar-none {
  scrollbar-width: none;        /* Firefox */
  -ms-overflow-style: none;     /* IE/Edge */
}
.scrollbar-none::-webkit-scrollbar {
  display: none;                /* Chrome, Safari, Opera */
}
```

**2. `src/components/vianta/HeroSection.tsx`** — Remover o `pb-2` do container do carousel (esse padding estava a criar espaço para a scrollbar aparecer), e substituir por `py-1` ou sem padding:

```tsx
// Antes
className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 px-5"

// Depois
className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none px-5"
```

### Ficheiros alterados

| Ficheiro | Alteração |
|---|---|
| `src/index.css` | Adicionar bloco CSS explícito para `.scrollbar-none` |
| `src/components/vianta/HeroSection.tsx` | Remover `pb-2` do div do carousel |

Pequena alteração, resultado imediato — a barra de scroll desaparece completamente em todos os browsers.
