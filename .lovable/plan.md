## Alteração no VehicleCard

No bloco de preço (canto superior direito do card), reorganizar para:

1. Linha pequena (label): `desde` — em texto pequeno, cor `muted-foreground`
2. Linha principal: `285€/mês` — mantém o destaque grande/bold em primary
3. Linha secundária: `28 500 €` — preço de venda em texto pequeno

Ou seja, o "desde" deixa de aparecer junto ao preço de venda e passa a ser um label discreto por cima da prestação mensal.

### Ficheiro a editar
- `src/components/vianta/VehicleCard.tsx` — bloco do `monthlyPrice` (substituir o atual layout em duas linhas)

### Snippet (referência)
```tsx
<p className="text-xs text-muted-foreground leading-none">desde</p>
<p className="text-3xl font-extrabold text-primary leading-none whitespace-nowrap mt-1">
  {vehicle.monthlyPrice}€<span className="text-base font-bold">/mês</span>
</p>
<p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
  {formatPrice(vehicle.salePrice)}
</p>
```

Quando não há `monthlyPrice`, mantém-se o comportamento atual (apenas preço de venda).