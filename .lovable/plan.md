## Adicionar estado "Disponível em Breve"

Novo terceiro estado no badge sobre a foto do carro (em conjunto com "Em Stock" e "Por Encomenda · 30-60 dias"), mostrando a data da coluna `Disponível a partir de` da sheet.

### Mapeamento

Na sheet, coluna `Estado` pode ter o valor `Disponível em Breve` (qualquer variante por confirmar — assumimos exatamente esta string, case-insensitive). Coluna `Disponível a partir de` contém a data (formato livre, ex.: `01/2026` ou `Janeiro 2026`).

### Alterações

**`src/data/vehicles.ts`**
- Adicionar `"soon"` ao tipo `Availability`: `"stock" | "order" | "soon"`.

**`src/lib/sheet-vehicles.ts`**
- Em `mapAvailability`, reconhecer `"disponível em breve"` / `"disponivel em breve"` → `"soon"`.
- Preencher o já existente campo `availableFrom` no objeto `Vehicle` a partir da coluna `Disponível a partir de` quando `availability === "soon"`.

**`src/components/vianta/VehicleCard.tsx`**
- Adicionar terceiro badge para `availability === "soon"` no mesmo lugar dos outros (canto superior esquerdo da imagem):
  - Ícone: `CalendarClock` (lucide-react) — distingue dos restantes (`CheckCircle2` para stock, `Clock` para encomenda).
  - Cores: paleta azul para diferenciar — `bg-sky-500/15 border-sky-500/30 text-sky-700`.
  - Texto: `Disponível em Breve · {vehicle.availableFrom}` (omitir o sufixo se a data não estiver preenchida).

### Notas

- Sem alterações de business logic além do mapping; é puramente apresentação + um novo valor enum.
- Nenhuma alteração no carregamento ou no resto da página.
