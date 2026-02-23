

## Adicionar Tesla Model 3 Dualmotor + Categorias + Remover bullets

### 1. `src/data/vehicles.ts` -- Novo modelo de dados e nova viatura

**Alterações ao interface `Vehicle`:**
- Adicionar campo `categories?: string[]` -- lista de categorias/tags (ex: `["Comfort", "Eletric", "Green", "BlackTVDE", "Tours"]`)
- Adicionar campo `seats: number` -- número de lugares

**Nova viatura a adicionar (após o Tesla existente):**

| Campo | Valor |
|---|---|
| id | `"tesla-model-3-dualmotor"` |
| model | `"Tesla Model 3 Dualmotor"` |
| year | 2020 |
| transmission | `"Automático"` |
| fuel | `"Elétrico"` |
| weeklyPrice | 350 |
| deposit | 600 |
| depositInstallments | `"300€ + 100€ + 100€ + 100€"` |
| availability | `"available"` |
| imageUrl | `"/images/tesla-model-3.jpg"` (reutiliza a mesma imagem do outro Tesla) |
| specs | `[]` (vazio, já não será usado) |
| seats | 5 |
| categories | `["Comfort", "Eletric", "Green", "BlackTVDE", "Tours"]` |

Adicionar também `seats: 5` e `categories` vazias ou adequadas às restantes viaturas existentes.

### 2. `src/components/vianta/VehicleBottomSheet.tsx` -- Popup reestruturado

**Remover:** A secção de bullets/specs (linhas 158-166) -- o bloco `<ul>` com os `specs.map()`

**Adicionar ao grid de detalhes:** Um 5.o card para "Lugares" com o ícone `Users` do lucide-react, mostrando `vehicle.seats`

**Adicionar secção de categorias:** Abaixo do grid de detalhes, quando `vehicle.categories` existir e tiver itens, mostrar uma linha de badges/tags coloridas com as categorias. Cada badge será um `<span>` com estilo `bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full`.

**Nota de financiamento na caução:** Adicionar um segundo parágrafo ao card da caução flexível:
> "Precisa de mais parcelas? Contacte-nos — temos opções de financiamento adaptadas a si."

### 3. Ficheiros alterados

| Ficheiro | Alteracao |
|---|---|
| `src/data/vehicles.ts` | Adicionar campos `seats` e `categories` ao interface; adicionar Tesla Model 3 Dualmotor; preencher `seats` e `categories` nas viaturas existentes |
| `src/components/vianta/VehicleBottomSheet.tsx` | Remover lista de specs; adicionar card Lugares ao grid; adicionar secção de categorias; adicionar nota de financiamento |
