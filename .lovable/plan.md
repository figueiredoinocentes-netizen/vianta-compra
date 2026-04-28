# Adicionar Opel Mokka-e e introduzir badge "Stock" vs "Por Encomenda"

## 1. Imagem do veículo
- Copiar a imagem carregada para `src/assets/opel-mokka-e.png` (apesar de mostrar matrícula "VIANTA", trata-se de um Opel Mokka preto — usa-se como foto do carro)
- Nota: as outras viaturas estão em `/public/images/`. Para manter consistência, copiar para `public/images/opel-mokka-e.png`

## 2. Modelo de dados — `src/data/vehicles.ts`
- Adicionar campo opcional `availability: "stock" | "order"` ao tipo `Vehicle`
  - `"stock"` → entrega imediata
  - `"order"` → entrega em 30 a 60 dias
- Marcar Peugeot e2008 e BYD Ato 3 com `availability: "stock"`
- Adicionar nova entrada Opel Mokka-e:
  - `id: "opel-mokka-e"`
  - `model: "Opel Mokka-e"`
  - `year: 2023`
  - `transmission: "Automático"`, `fuel: "Elétrico"`
  - `salePrice: 20000`, `mileage: 20000`
  - `imageUrl: "/images/opel-mokka-e.png"`
  - `seats: 5`, `categories: ["Comfort", "Eletric", "Green"]`
  - `availability: "order"`

## 3. Badge na imagem do card — `src/components/vianta/VehicleCard.tsx`
Substituir o banner atual de `availableFrom` por um sistema de badge canto superior esquerdo da imagem:

- **Stock disponível** (verde): ícone `CheckCircle2` + texto "Em Stock"
- **Por encomenda** (âmbar/laranja): ícone `Clock` + texto "Por Encomenda · 30-60 dias"

A badge é uma pill pequena (não banner full-width), mais subtil e elegante que o banner antigo. O `availableFrom` antigo deixa de ser usado (mantemos o campo no tipo por retro-compat, mas sem render).

## 4. Detalhe no bottom sheet — `src/components/vianta/VehicleBottomSheet.tsx`
Adicionar uma linha informativa no topo (logo abaixo do título ou perto do preço) consoante a `availability`:
- Stock → "Disponível em stock — entrega imediata após reserva"
- Encomenda → "Por encomenda — entrega em 30 a 60 dias"

## Detalhes técnicos

**Ficheiros alterados:**
- `src/data/vehicles.ts` — novo tipo + 3 entradas atualizadas
- `src/components/vianta/VehicleCard.tsx` — substituir bloco do banner por badge condicional
- `src/components/vianta/VehicleBottomSheet.tsx` — adicionar linha de availability
- `public/images/opel-mokka-e.png` — nova imagem (copiada do upload)

**Cores das badges** (usar tokens existentes ou inline Tailwind):
- Stock: fundo `bg-emerald-500/15`, texto `text-emerald-700`, border `border-emerald-500/30`
- Encomenda: fundo `bg-amber-500/15`, texto `text-amber-700`, border `border-amber-500/30`
