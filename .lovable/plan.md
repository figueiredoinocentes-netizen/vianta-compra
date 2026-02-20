
## Aumentar a barra e o logo

Alteração simples em `src/components/vianta/TopStrip.tsx`:

- **Padding vertical**: `py-2` → `py-3` (barra mais alta)
- **Altura do logo**: `h-8` (32px) → `h-11` (44px)

```tsx
<div className="bg-strip flex items-center px-4 py-3">
  <img src={logo} alt="Vianta" className="h-11 w-auto" />
</div>
```

Ficheiro alterado: `src/components/vianta/TopStrip.tsx`
