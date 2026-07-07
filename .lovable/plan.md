## Problema

Na sheet o Dacia Sandero tem `Combustível = "GPL"`, mas o parser `mapFuel` em `src/lib/sheet-vehicles.ts` só reconhece Elétrico / Híbrido / Diesel e cai no default `"Gasolina"`. Como o tipo `Fuel` também não inclui GPL, a viatura aparece como "Gasolina" no card e no bottom sheet.

Além disso, o `fuelLabel` nunca é preenchido a partir da sheet, então o texto mostrado é sempre o valor mapeado (perdendo variantes como "GPL", "Híbrido Plug-in", etc.).

## Alterações

**`src/data/vehicles.ts`**
- Adicionar `"GPL"` ao tipo `Fuel`.

**`src/lib/sheet-vehicles.ts`**
- Em `mapFuel`, reconhecer `"gpl"` / `"glp"` / `"lpg"` → `"GPL"`.
- Passar `fuelLabel` = valor original da sheet (trim) quando existir, para preservar exatamente o que está escrito (ex.: "GPL").

**`src/components/vianta/VehicleCard.tsx`**
- Em `FuelIcon`, usar o ícone `Fuel` também para GPL (já é o default, mas garantir que não quebra). Sem outras alterações visuais.

Fora de âmbito: layout, cores, formulários, outras secções.
