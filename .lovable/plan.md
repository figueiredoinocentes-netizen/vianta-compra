## Objetivo

Substituir os dados estáticos das viaturas (`src/data/vehicles.ts`) por dados dinâmicos vindos do Google Sheets (aba `Venda`), com fallback discreto em caso de falha.

## Acesso à Sheet

A sheet é **pública** e acessível via endpoint CSV do Google Visualization API (sem OAuth, sem connector, sem edge function):

```
https://docs.google.com/spreadsheets/d/1IymwMQtujdohVQPEuIfjxqZvH8EfZTLyp8wW7K7hO00/gviz/tq?tqx=out:csv&sheet=Venda
```

Confirmei que o CSV devolve as colunas necessárias (Carro, Versão, Valor, 120 Meses/10 anos, Autonomia Real, Combustível, Estado, Ano, KM's, Foto).

## Mapeamento de campos

| Coluna Sheet | Campo Vehicle | Notas |
|---|---|---|
| Carro | `model` | |
| Versão | `version` | omitir se vazio |
| Ano | `year` (string) | **manter exatamente como está na sheet** (`2024`, `06/2024`, `7/2023`) |
| Foto | `imageUrl` | converter URL Drive `/file/d/{ID}/view` em `https://drive.google.com/thumbnail?id={ID}&sz=w800` |
| Valor | `salePrice` | parse PT (`28 500,00 €` → `28500`) |
| 120 Meses/10 anos | `monthlyPrice` | parse PT; omitir se vazio |
| Combustível | `fuel` | |
| KM's | `mileage` | parse PT (`10 000,00` → `10000`) |
| Autonomia Real | `realRange` | omitir se vazio |
| Estado | `availability` | `Para Venda` → `stock`; `Por Encomenda` → `order`; outros → filtrar |

## Filtragem

Apenas linhas com `Estado` = `Para Venda` ou `Por Encomenda`. Outras (vendido, etc.) são ignoradas.

## Implementação técnica

1. **`src/data/vehicles.ts`**
   - Alterar `Vehicle.year` de `number` para `string` para preservar formato `MM/YYYY`.
   - Manter o array atual como `fallbackVehicles` (referência).

2. **`src/lib/sheet-vehicles.ts`** (novo)
   - `fetchVehicles(): Promise<Vehicle[]>` faz `fetch` ao endpoint CSV com `cache: 'no-store'`.
   - Parser CSV simples (lida com aspas — formato gviz é consistente).
   - Helpers: `parsePtNumber`, `normalizeDriveUrl`, `mapRowToVehicle`.
   - Filtra por `Estado`; omite campos vazios sem descartar a linha inteira.

3. **`src/components/vianta/HeroSection.tsx`**
   - Hook local com `useState`/`useEffect` que chama `fetchVehicles()`.
   - **Loading**: 2-3 skeletons no carrossel (`animate-pulse` + `bg-muted`).
   - **Erro**: mensagem discreta abaixo do título — "Não foi possível carregar as viaturas. Tente novamente mais tarde."
   - **Sucesso vazio**: "Sem viaturas disponíveis no momento."

4. **Imagens do Drive**
   - Converter `/file/d/{ID}/view` → `https://drive.google.com/thumbnail?id={ID}&sz=w800`.
   - `onError` no `<img>` do `VehicleCard` que substitui por `/placeholder.svg`.

5. **VehicleCard / VehicleBottomSheet**
   - Pequeno ajuste para tratar `year` como string (já é renderizado como texto).
   - Resto sem alterações — já lidam com campos opcionais.

## Cuidados

- A sheet tem de continuar **pública** ("Qualquer pessoa com o link pode ver"). Comentário no topo do ficheiro a alertar.
- Tudo client-side, sem secrets nem Lovable Cloud.

## Ficheiros tocados

- novo: `src/lib/sheet-vehicles.ts`
- editado: `src/components/vianta/HeroSection.tsx`
- editado: `src/components/vianta/VehicleCard.tsx` (`onError` + `year` string)
- editado: `src/components/vianta/VehicleBottomSheet.tsx` (`year` string)
- editado: `src/data/vehicles.ts` (interface `year: string`, rename para `fallbackVehicles`)