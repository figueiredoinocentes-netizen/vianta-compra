
## Aumentar os cards e espaçamentos da secção Hero

### Objetivo
Fazer a secção Hero ocupar mais espaço vertical no ecrã — cards maiores, imagem mais alta, padding interno maior e mais espaçamento entre elementos.

### Alterações

#### `src/components/vianta/HeroSection.tsx`
- `pt-6 pb-8` → `pt-8 pb-10` (mais espaço em cima e em baixo da secção)
- `mb-6` no bloco do título → `mb-8` (mais separação entre título e carrossel)
- `gap-3` no carrossel → `gap-4` (mais espaço entre cards)
- `mt-3` no swipe hint → `mt-5` (mais separação após o carrossel)

#### `src/components/vianta/VehicleCard.tsx`
- `w-[82vw] max-w-[320px]` → `w-[88vw] max-w-[360px]` (card mais largo)
- `h-44` na imagem → `h-52` (imagem mais alta: 176px → 208px)
- `p-4` no body → `p-5` (padding interno maior)
- `mb-3` entre nome/preço → `mb-4`
- `mb-4` entre specs e botão → `mb-5`
- `h-11` no botão → `h-12` (botão ligeiramente mais alto)
- `text-2xl` no preço → `text-3xl` (preço mais proeminente)
- `text-base` no modelo → `text-lg` (modelo ligeiramente maior)

### Ficheiros alterados
| Ficheiro | Alteração |
|---|---|
| `src/components/vianta/HeroSection.tsx` | Mais padding na secção, maior gap no carrossel, mais espaço no swipe hint |
| `src/components/vianta/VehicleCard.tsx` | Cards mais largos, imagem mais alta, padding interno maior, preço e modelo com texto maior |
