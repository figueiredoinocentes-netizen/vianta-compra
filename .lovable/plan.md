

## Adicionar card de quilometragem ao pop-up de viaturas

### O que muda

Adicionar um novo card na grelha de detalhes do `VehicleBottomSheet`, ao lado do card de "Lugares", com a informacao de que o aluguer inclui ate 2.000 km.

### Alteracao

**`src/components/vianta/VehicleBottomSheet.tsx`**

- Importar o icone `Gauge` do `lucide-react` (representativo de quilometragem/velocimetro)
- Adicionar um novo card apos o card de "Lugares" (linha 173), seguindo o mesmo estilo visual dos restantes:

```text
  Icone: Gauge
  Label: Quilometragem
  Valor: Até 2.000 km
```

- A grelha ja e `grid-cols-2`, por isso o novo card (6.o item) fica alinhado ao lado do de "Lugares", preenchendo a linha de forma uniforme

### Resultado

A grelha de detalhes passa de 5 para 6 cards (3 linhas completas de 2), com o novo card de quilometragem visualmente consistente com os restantes.

