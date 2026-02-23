

## Adicionar prestações e aviso no card de Caução

Alteração no ficheiro `src/components/vianta/VehicleBottomSheet.tsx`: no card "Caução" dentro do grid de detalhes, adicionar duas linhas extra abaixo do valor do depósito:

1. As prestações (`vehicle.depositInstallments`) em texto pequeno
2. Um aviso curto sobre a possibilidade de dividir por mais prestações

### Resultado visual no card

```text
┌───────────────────────────┐
│ 🛡  Caução                │
│    600€                   │
│    300€ + 100€ + 100€ + 100€  │
│    Divisível em mais prestações │
└───────────────────────────┘
```

### Alteração técnica

**Ficheiro:** `src/components/vianta/VehicleBottomSheet.tsx`

No card de Caução (linhas ~130-137), adicionar abaixo de `<p>{vehicle.deposit}€</p>`:

```tsx
<p className="text-[10px] text-muted-foreground mt-0.5">{vehicle.depositInstallments}</p>
<p className="text-[10px] text-accent font-medium mt-0.5">Divisível em mais prestações</p>
```

Nenhum outro ficheiro é alterado.

