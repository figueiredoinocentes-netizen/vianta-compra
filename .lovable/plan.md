
## Centrar cada card da viatura no ecrã

### Problema

Actualmente o carousel tem:
- `snap-x snap-mandatory` no container — correcto
- `snap-start` em cada card — o snap ancora no **bordo esquerdo** do card, não no centro do ecrã

Resultado: o card fica encostado à esquerda, não centrado.

### Solução

Duas alterações em dois ficheiros:

---

#### 1. `src/components/vianta/VehicleCard.tsx` — `snap-start` → `snap-center`

```tsx
// Antes
className="flex-none w-[82vw] max-w-[320px] ... snap-start"

// Depois
className="flex-none w-[82vw] max-w-[320px] ... snap-center"
```

Com `snap-center`, o browser alinha o **centro do card** com o **centro do viewport** a cada snap.

---

#### 2. `src/components/vianta/HeroSection.tsx` — Padding lateral simétrico no carousel

Com `snap-center`, é necessário dar espaço lateral ao container para o primeiro e último card também possam centrar correctamente (caso contrário o primeiro/último card ficam truncados). Isto faz-se com `scroll-padding` ou padding lateral no próprio container:

```tsx
// Antes
className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none px-5"

// Depois
className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none"
style={{ 
  WebkitOverflowScrolling: "touch",
  paddingLeft: "calc(50vw - 41vw)",   // (100vw - 82vw) / 2
  paddingRight: "calc(50vw - 41vw)"
}}
```

Ou de forma mais simples e eficaz, usar `px-[9vw]` (aprox. `(100 - 82) / 2 = 9vw`):

```tsx
className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none px-[9vw]"
```

Isto garante que o primeiro card começa centrado e o último também consegue centrar-se antes de chegar ao fim.

Também remover o `<div className="flex-none w-4" />` (trailing spacer) pois com `snap-center` e padding simétrico já não é necessário.

---

### Ficheiros a alterar

| Ficheiro | Alteração |
|---|---|
| `src/components/vianta/VehicleCard.tsx` | `snap-start` → `snap-center` |
| `src/components/vianta/HeroSection.tsx` | `px-5` → `px-[9vw]`, remover trailing spacer |

### Resultado esperado

- Cada card fica **centrado no ecrã** ao parar o scroll
- O primeiro card começa centrado (não encostado à esquerda)
- O último card também centra correctamente
- O snap continua a funcionar — um card de cada vez
