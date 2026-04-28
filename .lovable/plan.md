## Reposicionar label "desde" no VehicleCard

Atualmente o bloco de preço está todo `text-right`, fazendo o "desde" alinhar à direita. Pretende-se:

```
desde
280€/mês
        19.000€
```

— `desde` alinhado à esquerda, mesmo por cima do "2" de `280€/mês`
— `280€/mês` mantém destaque (grande, bold, primary)
— `19.000€` (preço de venda) por baixo, alinhado à direita

### Alteração

Em `src/components/vianta/VehicleCard.tsx`, no bloco com `monthlyPrice`:
- Remover `text-right` do container e usar `flex flex-col items-end` (para alinhar tudo à direita por defeito)
- O `desde` recebe `self-start` (alinha à esquerda da própria coluna, ou seja, mesmo por cima do início do `280€/mês` já que a largura da coluna é a do conteúdo mais largo)

```tsx
<div className="shrink-0 flex flex-col items-end">
  <p className="text-xs text-muted-foreground leading-none self-start">desde</p>
  <p className="text-3xl font-extrabold text-primary leading-none whitespace-nowrap mt-1">
    {vehicle.monthlyPrice}€<span className="text-base font-bold">/mês</span>
  </p>
  <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
    {formatPrice(vehicle.salePrice)}
  </p>
</div>
```

Caso sem `monthlyPrice` mantém-se `text-right` simples.