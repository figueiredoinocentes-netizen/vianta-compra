
## Atualização do stock de viaturas

### Objetivo
Substituir as 3 viaturas existentes pelas 4 novas, com os dados corretos, e mostrar o preço antigo riscado no Tesla Model 3 (único com desconto de 380€ → 360€).

---

### Alterações

#### 1. `src/data/vehicles.ts` — Novo stock completo

Substituir todas as viaturas e atualizar o tipo `Fuel` para incluir `"Diesel"`. Adicionar um campo opcional `previousPrice` para suportar a regra do preço antigo. Atualizar o campo `availability` para incluir `"available"` em todos os casos (todos têm estado "Para Alugar").

Também é necessário adicionar o campo `depositInstallments` para mostrar as parcelas da caução no bottom sheet.

Novo stock:

| # | Viatura | Preço | Preço anterior | Combustível | Ano | Caixa | Caução | Parcelas |
|---|---|---|---|---|---|---|---|---|
| 1 | Tesla Model 3 | 360€ | 380€ | Elétrico | 2022 | Automático | 600€ | 300+100+100+100 |
| 2 | Seat Leon | 250€ | — | Diesel | 2020 | Manual | 300€ | 150+75+75 |
| 3 | Fiat Tipo SW (2021) | 235€ | — | Diesel | 2021 | Manual | 300€ | 150+75+75 |
| 4 | Fiat Tipo SW (2020) | 235€ | — | Diesel | 2020 | Manual | 300€ | 150+75+75 |

Imagens: serão usadas imagens do Unsplash adequadas a cada modelo.

#### 2. `src/components/vianta/VehicleCard.tsx` — Preço antigo riscado

Quando `vehicle.previousPrice` existir, mostrar acima do preço atual o valor antigo em texto pequeno riscado (ex: `~~380€~~`), para dar destaque ao novo preço mais baixo.

Exemplo visual no card:
```text
~~380€~~   ← pequeno, riscado, cor muted
360€        ← grande, negrito, cor primary
por semana
```

#### 3. `src/components/vianta/VehicleBottomSheet.tsx` — Preço antigo + parcelas

- Mostrar o `previousPrice` riscado também no bottom sheet, acima do preço atual.
- Substituir o texto estático do depósito ("Pode pagar em 3 prestações...") por texto dinâmico baseado no campo `depositInstallments` de cada viatura. Ex: para Tesla "300€ + 100€ + 100€ + 100€".

---

### Ficheiros alterados

| Ficheiro | Alteração |
|---|---|
| `src/data/vehicles.ts` | Stock completamente substituído, tipos atualizados, campos `previousPrice` e `depositInstallments` adicionados |
| `src/components/vianta/VehicleCard.tsx` | Exibe preço antigo riscado quando `previousPrice` existe |
| `src/components/vianta/VehicleBottomSheet.tsx` | Exibe preço antigo riscado e parcelas dinâmicas da caução |

---

### Notas técnicas
- O tipo `Fuel` passa a incluir `"Diesel"` (atualmente só tem `"Elétrico" | "Híbrido" | "Gasolina" | "Diesel"` — já inclui Diesel, apenas a label exibida muda de "Diesel" para "Gasóleo/Diesel").
- O campo `depositInstallments` será do tipo `string` (ex: `"300€ + 100€ + 100€ + 100€"`) para flexibilidade.
- O campo `previousPrice` será `number | undefined`, opcional.
- Os dois Fiat Tipo SW terão IDs distintos: `"fiat-tipo-sw-2021"` e `"fiat-tipo-sw-2020"`.
